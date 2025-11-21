<?php

namespace App\Repositories;

use App\Http\Resources\Feature\GasCylinderResource;
use App\Models\Features\GasCylinder;
use Illuminate\Database\Eloquent\Builder;
use App\Repositories\Contracts\GasCylinderRepositoryInterface;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class GasCylinderRepository implements GasCylinderRepositoryInterface
{
    public function create(array $validated)
    {
        try {
            return DB::transaction(fn() => GasCylinder::create($validated));
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function paginate(int $perPage = 10): JsonResource
    {
        return GasCylinderResource::collection(
            GasCylinder::when(request()->has('keyword') && request()->get('keyword'), function (Builder $query) {
                $query->where('name', 'LIKE', '%' . request()->get('keyword') . '%');
            })->paginate(perPage: request()->has('per_page') ? request()->get('per_page') : $perPage),
        );
    }

    public function find(string $id)
    {
        $gasCylinder = GasCylinder::find($id);

        if (!$gasCylinder) {
            throw ValidationException::withMessages([
                'message' => 'Data Tabung Gas tidak ditemukan.',
            ]);
        }

        return $gasCylinder;
    }

    public function update(string $id, array $validated)
    {
        try {
            return DB::transaction(function () use ($id, $validated) {
                $gasCylinder = $this->find($id);
                $gasCylinder->update($validated);
                return $gasCylinder;
            });
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function delete(string $id)
    {
        return $this->find($id)->delete();
    }

    public function getStockByStatus(string $id, int $status): int
    {
        return \App\Models\Features\GasCylinderHistory::where('gas_cylinder_id', $id)
            ->where('status', $status)
            ->sum('stock');
    }

    public function getLocationStocks(string $id): array
    {
        $stocks = \App\Models\Features\GasCylinderHistory::select(
            'location_id',
            DB::raw('MAX(gas_locations.name) as location_name'),
            DB::raw('SUM(CASE WHEN status = 1 THEN stock ELSE 0 END) as stock_isi'),
            DB::raw('SUM(CASE WHEN status = 2 THEN stock ELSE 0 END) as stock_kosong'),
            DB::raw('SUM(CASE WHEN status = 3 THEN stock ELSE 0 END) as stock_bocor'),
            DB::raw('0 as stock_pinjam'), // TODO: Implement if needed
            DB::raw('0 as stock_dipinjam'), // TODO: Implement if needed
            DB::raw('SUM(stock) as total_stock')
        )
            ->join('gas_locations', 'gas_locations.id', '=', 'gas_cylinder_histories.location_id')
            ->where('gas_cylinder_id', $id)
            ->groupBy('location_id')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->location_id,
                    'location_id' => $item->location_id,
                    'location_name' => $item->location_name,
                    'stock_isi' => (int) $item->stock_isi,
                    'stock_kosong' => (int) $item->stock_kosong,
                    'stock_bocor' => (int) $item->stock_bocor,
                    'stock_pinjam' => (int) $item->stock_pinjam,
                    'stock_dipinjam' => (int) $item->stock_dipinjam,
                    'total_stock' => (int) $item->total_stock,
                ];
            })
            ->toArray();

        return $stocks;
    }

    public function getPriceHistories(string $id): array
    {
        $histories = \App\Models\Features\GasCylinderHistory::select(
            'gas_cylinder_histories.id',
            'gas_cylinder_histories.location_id',
            'gas_locations.name as location_name',
            'gas_cylinder_histories.capital_price',
            'gas_cylinder_histories.base_price',
            'gas_cylinder_histories.retail_price',
            'gas_cylinder_histories.stock',
            'gas_cylinder_histories.status',
            'gas_cylinder_histories.created_at'
        )
            ->join('gas_locations', 'gas_locations.id', '=', 'gas_cylinder_histories.location_id')
            ->where('gas_cylinder_id', $id)
            ->orderBy('gas_cylinder_histories.created_at', 'desc')
            ->get()
            ->map(function ($item) {
                $statusLabels = [
                    1 => 'Isi',
                    2 => 'Kosong',
                    3 => 'Bocor',
                ];

                return [
                    'id' => $item->id,
                    'location_name' => $item->location_name,
                    'capital_price' => $item->capital_price,
                    'base_price' => $item->base_price,
                    'retail_price' => $item->retail_price,
                    'stock' => $item->stock,
                    'status' => $item->status,
                    'status_label' => $statusLabels[$item->status] ?? 'Unknown',
                    'created_at' => $item->created_at->format('d M Y H:i'),
                ];
            })
            ->toArray();

        return $histories;
    }
}
