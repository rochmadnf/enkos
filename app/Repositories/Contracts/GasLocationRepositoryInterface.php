<?php

namespace App\Repositories\Contracts;

interface GasLocationRepositoryInterface
{
    public function paginate(int $perPage = 8);

    public function find(string $id);

    public function create(array $validated);

    public function delete(string $id);

    public function update(string $id, array $validated);
}
