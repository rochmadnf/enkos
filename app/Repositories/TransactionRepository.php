<?php

namespace App\Repositories;

use App\Http\Resources\Feature\TransactionResource;
use App\Models\Features\Transaction;
use App\Models\Features\GasCylinderHistory;
use App\Repositories\Contracts\TransactionRepositoryInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class TransactionRepository implements TransactionRepositoryInterface
{
    public function paginate(int $perPage = 10): JsonResource
    {
        return TransactionResource::collection(
            Transaction::with(['location', 'gasCylinder'])
                ->when(request()->has('keyword') && request()->get('keyword'), function (Builder $query) {
                    $keyword = request()->get('keyword');
                    $query->whereHas('location', function ($q) use ($keyword) {
                        $q->where('name', 'LIKE', '%' . $keyword . '%');
                    })->orWhereHas('gasCylinder', function ($q) use ($keyword) {
                        $q->where('name', 'LIKE', '%' . $keyword . '%');
                    });
                })
                ->orderBy('transaction_date', 'desc')
                ->orderBy('created_at', 'desc')
                ->paginate(perPage: request()->has('per_page') ? request()->get('per_page') : $perPage),
        );
    }

    public function create(array $validated)
    {
        return DB::transaction(function () use ($validated) {
            // Create transaction
            $transaction = Transaction::create($validated);

            $gasCylinder = \App\Models\Features\GasCylinder::find($validated['gas_cylinder_id']);

            if (!$gasCylinder) {
                throw ValidationException::withMessages([
                    'gas_cylinder_id' => 'Tabung gas tidak ditemukan.',
                ]);
            }

            // Logika berbeda untuk REFILL vs BELI UTUH
            if ($validated['purchase_type'] == \App\Enums\GasCylinder\PurchaseTypeEnum::REFILL->value) {
                // REFILL: Kurangi stok ISI, tambah stok KOSONG
                $filledHistory = GasCylinderHistory::where('gas_cylinder_id', $validated['gas_cylinder_id'])
                    ->where('location_id', $validated['location_id'])
                    ->where('status', \App\Enums\GasCylinder\ConditionTypeEnum::FILLED)
                    ->where('stock', '>', 0)
                    ->first();

                if (!$filledHistory) {
                    throw ValidationException::withMessages([
                        'quantity' => 'Stok tabung isi tidak tersedia di lokasi ini.',
                    ]);
                }

                if ($filledHistory->stock < $validated['quantity']) {
                    throw ValidationException::withMessages([
                        'quantity' => 'Stok tabung isi tidak mencukupi. Stok tersedia: ' . $filledHistory->stock,
                    ]);
                }

                // Kurangi stok ISI
                $filledHistory->stock -= $validated['quantity'];
                $filledHistory->save();

                // Tambah stok KOSONG (cari atau buat entry baru)
                $emptyHistory = GasCylinderHistory::where('gas_cylinder_id', $validated['gas_cylinder_id'])
                    ->where('location_id', $validated['location_id'])
                    ->where('status', \App\Enums\GasCylinder\ConditionTypeEnum::EMPTY)
                    ->first();

                if ($emptyHistory) {
                    $emptyHistory->stock += $validated['quantity'];
                    $emptyHistory->save();
                } else {
                    // Buat entry baru untuk stok KOSONG dengan harga dari stok ISI
                    GasCylinderHistory::create([
                        'gas_cylinder_id' => $validated['gas_cylinder_id'],
                        'location_id' => $validated['location_id'],
                        'capital_price' => $filledHistory->capital_price,
                        'base_price' => $filledHistory->base_price,
                        'retail_price' => $filledHistory->retail_price,
                        'stock' => $validated['quantity'],
                        'status' => \App\Enums\GasCylinder\ConditionTypeEnum::EMPTY,
                    ]);
                }
            } else {
                // BELI UTUH (TABUNG + GAS): Kurangi total_stock dan stok ISI di history
                if ($gasCylinder->total_stock < $validated['quantity']) {
                    throw ValidationException::withMessages([
                        'quantity' => 'Total stok tabung tidak mencukupi. Stok tersedia: ' . $gasCylinder->total_stock,
                    ]);
                }

                $filledHistory = GasCylinderHistory::where('gas_cylinder_id', $validated['gas_cylinder_id'])
                    ->where('location_id', $validated['location_id'])
                    ->where('status', \App\Enums\GasCylinder\ConditionTypeEnum::FILLED)
                    ->where('stock', '>', 0)
                    ->first();

                if (!$filledHistory) {
                    throw ValidationException::withMessages([
                        'quantity' => 'Stok tabung isi tidak tersedia di lokasi ini.',
                    ]);
                }

                if ($filledHistory->stock < $validated['quantity']) {
                    throw ValidationException::withMessages([
                        'quantity' => 'Stok tabung isi tidak mencukupi. Stok tersedia: ' . $filledHistory->stock,
                    ]);
                }

                // Kurangi total_stock di gas_cylinders
                $gasCylinder->total_stock -= $validated['quantity'];
                $gasCylinder->save();

                // Kurangi stok ISI di history
                $filledHistory->stock -= $validated['quantity'];
                $filledHistory->save();
            }

            return $transaction;
        });
    }

    public function find(string $id, bool $wrap = false)
    {
        $transaction = Transaction::with(['location', 'gasCylinder'])->find($id);

        if (!$transaction) {
            throw ValidationException::withMessages([
                'message' => 'Data transaksi tidak ditemukan.',
            ]);
        }

        if ($wrap) {
            return TransactionResource::make($transaction);
        }

        return $transaction;
    }
}
