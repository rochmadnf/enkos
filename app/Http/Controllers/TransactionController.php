<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transaction\{StoreRequest, UpdateRequest};
use App\Http\Resources\Feature\TransactionResource;
use App\Repositories\Contracts\{GasLocationRepositoryInterface, GasCylinderRepositoryInterface, TransactionRepositoryInterface};
use Illuminate\Http\RedirectResponse;
use Inertia\Response as InertiaResponse;

class TransactionController extends Controller
{
    public function __construct(
        protected readonly TransactionRepositoryInterface $transactionRepo,
        protected readonly GasLocationRepositoryInterface $gLocRepo,
        protected readonly GasCylinderRepositoryInterface $gCylRepo
    ) {
        //
    }

    public function index(): InertiaResponse
    {
        $perPage = request()->integer('per_page', 10);
        $pageName = 'Transaksi Kasir';

        return inertia('transaction/index', [
            'page' => [
                'uuid' => 'mni_004',
                'name' => $pageName,
                'description' => 'Menampilkan seluruh transaksi penjualan tabung gas.',
                'breadcrumbs' => [['id' => 'trbrc_001', 'href' => '#', 'label' => $pageName]],
            ],
            'transactions' => $this->transactionRepo->paginate($perPage),
        ]);
    }

    public function create(): InertiaResponse
    {
        $pageName = 'Buat Transaksi';

        return inertia('transaction/create', [
            'page' => [
                'uuid' => 'mni_004',
                'name' => $pageName,
                'description' => 'Form untuk mencatat transaksi penjualan tabung gas.',
                'breadcrumbs' => [
                    ['id' => 'trbrc_001', 'href' => route('transaction.index'), 'label' => 'Transaksi Kasir'],
                    ['id' => 'trbrc_002', 'href' => '#', 'label' => $pageName],
                ],
            ],
            'gasLocations' => $this->gLocRepo->paginate(100),
            'purchaseTypes' => \App\Enums\GasCylinder\PurchaseTypeEnum::toArray(),
            'priceTypes' => \App\Enums\Transaction\PriceTypeEnum::toArray(),
        ]);
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $this->transactionRepo->create($request->validated());

        return to_route('transaction.index')->with('success', 'Transaksi berhasil disimpan.');
    }

    public function getStockInfo()
    {
        $locationId = request()->input('location_id');
        $gasCylinderId = request()->input('gas_cylinder_id');
        $quantity = request()->input('quantity', 0);
        $priceType = request()->input('price_type'); // 1 = base, 2 = retail

        if (!$locationId || !$gasCylinderId) {
            return response()->json(['stock' => 0, 'unit_price' => 0, 'total_price' => 0]);
        }

        // Ambil semua history dengan status FILLED yang memiliki stok (urut FIFO)
        $histories = \App\Models\Features\GasCylinderHistory::where('gas_cylinder_id', $gasCylinderId)
            ->where('location_id', $locationId)
            ->where('status', \App\Enums\GasCylinder\ConditionTypeEnum::FILLED)
            ->where('stock', '>', 0)
            ->orderBy('created_at', 'asc')
            ->get();

        if ($histories->isEmpty()) {
            return response()->json(['stock' => 0, 'unit_price' => 0, 'total_price' => 0]);
        }

        // Total stok dari semua history
        $totalStock = $histories->sum('stock');

        // Jika quantity tidak diberikan atau 0, kembalikan stok saja
        if (!$quantity || $quantity <= 0) {
            return response()->json([
                'stock' => $totalStock,
                'unit_price' => 0,
                'total_price' => 0,
            ]);
        }

        // Hitung total harga berdasarkan FIFO dari multiple histories
        $remainingQuantity = min($quantity, $totalStock);
        $totalPrice = 0;
        $processedQuantity = 0;

        foreach ($histories as $history) {
            if ($remainingQuantity <= 0) break;

            $price = $priceType == '2' ? $history->retail_price : $history->base_price;
            $toTake = min($remainingQuantity, $history->stock);

            $totalPrice += $toTake * $price;
            $processedQuantity += $toTake;
            $remainingQuantity -= $toTake;
        }

        // Hitung unit price rata-rata
        $unitPrice = $processedQuantity > 0 ? round($totalPrice / $processedQuantity) : 0;

        return response()->json([
            'stock' => $totalStock,
            'unit_price' => $unitPrice,
            'total_price' => $totalPrice,
        ]);
    }

    public function getCylindersByLocation()
    {
        $locationId = request()->input('location_id');

        if (!$locationId) {
            return response()->json(['data' => []]);
        }

        // Get gas cylinders yang ada di lokasi tersebut (yang punya stok ISI)
        $cylinders = \App\Models\Features\GasCylinder::whereHas('histories', function ($query) use ($locationId) {
            $query->where('location_id', $locationId)
                ->where('status', \App\Enums\GasCylinder\ConditionTypeEnum::FILLED)
                ->where('stock', '>', 0);
        })->get(['id', 'name']);

        return response()->json(['data' => $cylinders]);
    }

    public function edit(string $id): InertiaResponse
    {
        $transaction = $this->transactionRepo->find($id);

        if (!$transaction) {
            abort(404, 'Transaksi tidak ditemukan.');
        }

        $pageName = 'Edit Transaksi';

        return inertia('transaction/edit', [
            'page' => [
                'uuid' => 'mni_004',
                'name' => $pageName,
                'description' => 'Form untuk mengubah transaksi penjualan tabung gas.',
                'breadcrumbs' => [
                    ['id' => 'trbrc_001', 'href' => route('transaction.index'), 'label' => 'Transaksi Kasir'],
                    ['id' => 'trbrc_002', 'href' => '#', 'label' => $pageName],
                ],
            ],
            'transaction' => (new TransactionResource($transaction))->resolve(),
            'gasLocations' => $this->gLocRepo->paginate(100),
            'purchaseTypes' => \App\Enums\GasCylinder\PurchaseTypeEnum::toArray(),
            'priceTypes' => \App\Enums\Transaction\PriceTypeEnum::toArray(),
        ]);
    }

    public function update(UpdateRequest $request, string $id): RedirectResponse
    {
        $transaction = $this->transactionRepo->find($id);

        if (!$transaction) {
            abort(404, 'Transaksi tidak ditemukan.');
        }

        $this->transactionRepo->update($id, $request->validated());

        return to_route('transaction.index')->with('success', 'Transaksi berhasil diperbarui.');
    }

    public function destroy(string $id): RedirectResponse
    {
        $transaction = $this->transactionRepo->find($id);

        if (!$transaction) {
            abort(404, 'Transaksi tidak ditemukan.');
        }

        $this->transactionRepo->delete($id);

        return to_route('transaction.index')->with('success', 'Transaksi berhasil dihapus dan stok dikembalikan.');
    }
}
