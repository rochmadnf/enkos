<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transaction\StoreRequest;
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
                'uuid' => 'mni_003',
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
                'uuid' => 'mni_003',
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
        $locationId = request()->get('location_id');
        $gasCylinderId = request()->get('gas_cylinder_id');

        if (!$locationId || !$gasCylinderId) {
            return response()->json(['stock' => 0, 'base_price' => 0, 'retail_price' => 0]);
        }

        $history = \App\Models\Features\GasCylinderHistory::where('gas_cylinder_id', $gasCylinderId)
            ->where('location_id', $locationId)
            ->where('status', \App\Enums\GasCylinder\ConditionTypeEnum::FILLED)
            ->where('stock', '>', 0)
            ->first();

        if (!$history) {
            return response()->json(['stock' => 0, 'base_price' => 0, 'retail_price' => 0]);
        }

        return response()->json([
            'stock' => $history->stock,
            'base_price' => $history->base_price,
            'retail_price' => $history->retail_price,
        ]);
    }

    public function getCylindersByLocation()
    {
        $locationId = request()->get('location_id');

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
}
