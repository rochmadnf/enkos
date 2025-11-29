<?php

namespace App\Http\Controllers;

use App\Enums\GasCylinder\ConditionTypeEnum;
use App\Http\Requests\GasCylinder\{AddStockRequest, StoreRequest, UpdateRequest};
use App\Repositories\Contracts\{GasLocationRepositoryInterface, GasCylinderRepositoryInterface};
use Illuminate\Http\RedirectResponse;
use Inertia\Response as InertiaResponse;

class GasCylinderController extends Controller
{

    public function __construct(protected readonly GasCylinderRepositoryInterface $gCylRepo, protected readonly GasLocationRepositoryInterface $gLocRepo)
    {
        //
    }

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

    public function update(UpdateRequest $request, string $id): RedirectResponse
    {
        $this->gCylRepo->update($id, $request->validated());
        return to_route('gas_cylinder.index', request()->only(['keyword', 'page', 'per_page']));
    }

    public function destroy(string $id): RedirectResponse
    {
        $this->gCylRepo->delete($id);

        return to_route('gas_cylinder.index', request()->query());
    }

    public function show()
    {
        $gC = $this->gCylRepo->find(request()->get('uid'), true);

        return inertia('gas-cylinder/show', [
            'page' => [
                'uuid' => 'mni_002',
            ],
            'gasCylinder' => $gC,
            'gasLocations' => $this->gLocRepo->paginate(25),
            'conditionTypes' => \App\Enums\GasCylinder\ConditionTypeEnum::toArray(),
        ]);
    }

    public function addStock(AddStockRequest $request): RedirectResponse
    {
        $this->gCylRepo->addStock($request->validated());

        return to_route('gas_cylinder.show', array_merge(['gas_id' => $request->validated()['gas_cylinder_id']]));
    }
}
