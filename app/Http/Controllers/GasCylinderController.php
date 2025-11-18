<?php

namespace App\Http\Controllers;

use App\Http\Requests\GasCylinder\StoreRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Response as InertiaResponse;

class GasCylinderController extends Controller
{

    public function __construct(protected readonly \App\Repositories\Contracts\GasCylinderRepositoryInterface $gCylRepo) {}

    public function index(): InertiaResponse
    {
        $perPage = request()->integer('per_page', 5);
        $pageName = 'Tabung Gas';

        return inertia('gas-cylinder/index', [
            'page' => [
                'uuid' => 'mni_002',
                'name' => $pageName,
                'description' => 'Menampilkan tabung yang sudah tersimpan di sistem.',
                'breadcrumbs' => [['id' => 'gcbrc_001', 'href' => '#', 'label' => $pageName]],
            ],
            'gasCylinders' => $this->gCylRepo->paginate($perPage),
        ]);
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $this->gCylRepo->create($request->validated());

        return to_route('gas_cylinder.index', request()->query());
    }

    public function destroy(string $id): RedirectResponse
    {
        $this->gCylRepo->delete($id);

        return to_route('gas_cylinder.index', request()->query());
    }
}
