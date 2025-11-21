<?php

namespace App\Http\Controllers;

use App\Http\Requests\GasCylinder\{StoreRequest, UpdateRequest};
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

    public function show(string $id): InertiaResponse
    {
        $gasCylinder = $this->gCylRepo->find($id);
        $pageName = "Detail: {$gasCylinder->name}";

        return inertia('gas-cylinder/show', [
            'page' => [
                'uuid' => 'mni_002_detail',
                'name' => $pageName,
                'description' => 'Detail informasi dan distribusi stok tabung gas.',
                'breadcrumbs' => [
                    ['id' => 'gcbrc_001', 'href' => route('gas_cylinder.index'), 'label' => 'Tabung Gas'],
                    ['id' => 'gcbrc_002', 'href' => '#', 'label' => 'Detail'],
                ],
            ],
            'gasCylinder' => [
                'data' => [
                    'id' => $gasCylinder->id,
                    'name' => $gasCylinder->name,
                    'total_stock' => $gasCylinder->total_stock,
                    'stock_isi' => $this->gCylRepo->getStockByStatus($id, 1),
                    'stock_kosong' => $this->gCylRepo->getStockByStatus($id, 2),
                    'stock_bocor' => $this->gCylRepo->getStockByStatus($id, 3),
                    'created_at' => $gasCylinder->created_at->format('d M Y H:i'),
                ],
            ],
            'locationStocks' => $this->gCylRepo->getLocationStocks($id),
            'priceHistories' => $this->gCylRepo->getPriceHistories($id),
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
}
