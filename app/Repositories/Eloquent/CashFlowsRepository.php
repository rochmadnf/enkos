<?php

declare(strict_types=1);

namespace App\Repositories\Eloquent;

use App\Http\Resources\CashFlowsResource;
use App\Models\CashFlow;
use Illuminate\Http\Resources\Json\JsonResource;

class CashFlowsRepository extends BaseRepository
implements \App\Repositories\Contracts\CashFlowsRepositoryInterface
{
    public function __construct()
    {
        return parent::__construct(
            model: new CashFlow(),
            resource: CashFlowsResource::class
        );
    }

    public function paginate(int $perPage = 10): JsonResource
    {
        $users = CashFlow::latest('created_at')->paginate(perPage: request()->input('per_page', $perPage));

        return CashFlowsResource::collection($users);
    }
}
