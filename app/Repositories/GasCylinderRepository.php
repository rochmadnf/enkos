<?php

namespace App\Repositories;

use App\Http\Resources\Feature\GasCylinderResource;
use App\Models\Features\GasCylinder;
use Illuminate\Database\Eloquent\Builder;
use App\Repositories\Contracts\GasCylinderRepositoryInterface;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

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
}
