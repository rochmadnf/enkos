<?php

declare(strict_types=1);

namespace App\Repositories\Eloquent;

use App\Http\Resources\Feature\UsersResources;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class UsersRepository extends BaseRepository
implements \App\Repositories\Contracts\UsersRepositoryInterface
{
    public function __construct()
    {
        return parent::__construct(
            model: new User(),
            resource: UsersResources::class
        );
    }

    public function paginate(int $perPage = 10): JsonResource
    {
        $users = User::withoutSuperiorUser()->searchByKeyword()->paginate(perPage: request()->input('per_page', $perPage));

        return UsersResources::collection($users);
    }
}
