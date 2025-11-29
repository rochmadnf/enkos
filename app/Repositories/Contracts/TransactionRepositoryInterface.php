<?php

namespace App\Repositories\Contracts;

use Illuminate\Http\Resources\Json\JsonResource;

interface TransactionRepositoryInterface
{
    public function paginate(int $perPage = 10): JsonResource;

    public function create(array $validated);

    public function find(string $id, bool $wrap = false);

    public function update(string $id, array $validated);

    public function delete(string $id);
}
