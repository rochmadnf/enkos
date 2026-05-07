<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
use Inertia\Response as InertiaResponse;

class UserController extends Controller
{
    protected int $defaultPerPage = 5;

    public function __construct(protected readonly \App\Repositories\Contracts\UsersRepositoryInterface $usersRepo)
    {
        //
    }

    public function index(): InertiaResponse
    {
        return inertia('features/users/index', [
            'page' => [
                'uuid' => 'mni_005',
            ],
            'resources' => $this->usersRepo->paginate(perPage: request()->input('per_page', $this->defaultPerPage)),
        ]);
    }
}
