<?php

namespace App\Repositories;

use App\Http\Resources\GasLocationResource;
use App\Models\GasLocation;
use App\Repositories\Contracts\GasLocationRepositoryInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class GasLocationRepository implements GasLocationRepositoryInterface
{
    public function find(string $id)
    {
        $gasLocation = GasLocation::find($id);

        if (!$gasLocation) {
            throw ValidationException::withMessages([
                'message' => 'Data Lokasi tidak ditemukan.',
            ]);
        }

        return $gasLocation;
    }

    public function paginate(int $perPage = 8)
    {
        return GasLocationResource::collection(
            GasLocation::when(request()->has('keyword') && request()->get('keyword'), function (Builder $query) {
                $query->where('name', 'LIKE', '%' . request()->get('keyword') . '%');
            })->paginate(perPage: request()->has('per_page') ? request()->get('per_page') : $perPage),
        );
    }

    public function create(array $validated)
    {
        try {
            return DB::transaction(fn() => GasLocation::create($validated));
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function delete(string $id)
    {
        return $this->find($id)->delete();
    }

    public function update(string $id, array $validated)
    {
        return $this->find($id)->update($validated);
    }
}
