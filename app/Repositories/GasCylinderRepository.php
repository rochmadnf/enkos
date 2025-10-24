<?php

namespace App\Repositories;

use App\Models\Features\GasCylinder;
use App\Repositories\Contracts\GasCylinderRepositoryInterface;
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
}
