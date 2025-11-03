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
        return inertia('gas-cylinder/index', [
            'page' => [
                'uuid' => 'mni_002',
                'name' => ($pageName = 'Tabung Gas'),
                'description' => 'Menampilkan tabung yang sudah tersimpan di sistem.',
                'breadcrumbs' => [['id' => 'gcbrc_001', 'href' => '#', 'label' => $pageName]],
            ],
        ]);
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $this->gCylRepo->create($request->validated());

        return to_route('gas_cylinder.index');
    }
}
