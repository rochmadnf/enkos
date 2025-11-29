<?php

namespace App\Repositories\Contracts;

use Illuminate\Http\Resources\Json\JsonResource;

interface GasCylinderRepositoryInterface
{
    public function create(array $validated);

    public function paginate(int $perPage = 10): JsonResource;

    public function update(string $id, array $validated);

    public function delete(string $id);

    public function find(string $id, bool $wrap = false);

    public function addStock(array $validated);
}
