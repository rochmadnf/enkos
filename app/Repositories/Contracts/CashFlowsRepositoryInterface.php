<?php

namespace App\Repositories\Contracts;


interface CashFlowsRepositoryInterface extends BaseRepositoryInterface
{
    public function balance(string $type): int;
}
