<?php

namespace App\Repositories;

use App\Http\Resources\Feature\GasCylinderResource;
use App\Models\Features\GasCylinder;
use Illuminate\Database\Eloquent\Builder;
use App\Repositories\Contracts\GasCylinderRepositoryInterface;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;
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
            GasCylinder::when(request()->has('keyword') && request()->input('keyword'), function (Builder $query) {
                $query->where('name', 'LIKE', '%' . request()->input('keyword') . '%');
            })->paginate(perPage: request()->has('per_page') ? request()->input('per_page') : $perPage),
        );
    }

    public function find(string $id, bool $wrap = false)
    {
        $gasCylinder = GasCylinder::find($id);

        if (!$gasCylinder) {
            throw ValidationException::withMessages([
                'message' => 'Data Tabung Gas tidak ditemukan.',
            ]);
        }

        if ($wrap) {
            return GasCylinderResource::make($gasCylinder);
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

    public function addStock(array $validated)
    {
        try {
            return DB::transaction(function () use ($validated) {
                $gasCylinder = $this->find($validated['gas_cylinder_id']);
                $gasCylinder->histories()->create(Arr::except($validated, ['gas_cylinder_id']));
                return $gasCylinder;
            });
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function updateStock(string $historyId, array $validated)
    {
        try {
            return DB::transaction(function () use ($historyId, $validated) {
                $history = \App\Models\Features\GasCylinderHistory::find($historyId);

                if (!$history) {
                    throw ValidationException::withMessages([
                        'message' => 'Data history stok tidak ditemukan.',
                    ]);
                }

                $history->update(Arr::except($validated, ['gas_cylinder_id']));
                return $history;
            });
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function deleteStock(string $historyId)
    {
        try {
            return DB::transaction(function () use ($historyId) {
                $history = \App\Models\Features\GasCylinderHistory::find($historyId);

                if (!$history) {
                    throw ValidationException::withMessages([
                        'message' => 'Data history stok tidak ditemukan.',
                    ]);
                }

                return $history->delete();
            });
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
