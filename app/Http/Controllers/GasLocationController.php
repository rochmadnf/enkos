<?php

namespace App\Http\Controllers;

use App\Enums\GasLocation\TypeEnum;
use App\Http\Requests\GasLocation\UpdateRequest;
use App\Http\Resources\GasLocationResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;

class GasLocationController extends Controller
{
    public function __construct(protected \App\Repositories\Contracts\GasLocationRepositoryInterface $gasLocationRepo)
    {
        //
    }

    public function index(): InertiaResponse
    {
        return inertia('gas-location/index', [
            'page' => [
                'uuid' => 'mni_003',
                'name' => ($pageName = 'Lokasi Tabung'),
                'description' => 'Menampilkan seluruh daftar lokasi tabung gas.',
                'breadcrumbs' => [['id' => 'glbrc_001', 'href' => '#', 'label' => $pageName]],
            ],
            'resources' => $this->gasLocationRepo->paginate(),
        ]);
    }

    public function create(): InertiaResponse
    {
        return inertia('gas-location/add', [
            'page' => [
                'uuid' => 'mni_003',
                'name' => ($pageName = 'Tambah Lokasi'),
                'description' => 'Form untuk menambah lokasi tabung gas.',
                'breadcrumbs' => [
                    ['id' => 'glbrc_001', 'href' => route('gas_location.index'), 'label' => 'Lokasi Tabung'],
                    ['id' => 'glbrc_002', 'href' => '#', 'label' => $pageName],
                ],
            ],
            'type' => TypeEnum::toArray(),
        ]);
    }

    public function store(\App\Http\Requests\GasLocation\StoreRequest $request)
    {
        $this->gasLocationRepo->create($request->validated());
        return to_route('gas_location.index');
    }

    public function edit(string $id): InertiaResponse
    {
        $gasLocation = $this->gasLocationRepo->find($id);
        return inertia('gas-location/edit', [
            'page' => [
                'uuid' => 'mni_003',
                'name' => ($pageName = 'Ubah Data Lokasi'),
                'description' => 'Form untuk ubah data lokasi tabung gas.',
                'breadcrumbs' => [
                    ['id' => 'glbrc_001', 'href' => route('gas_location.index'), 'label' => 'Lokasi Tabung'],
                    ['id' => 'glbrc_002', 'href' => '#', 'label' => $pageName],
                ],
            ],
            'type' => TypeEnum::toArray(),
            'location' => GasLocationResource::make($gasLocation),
        ]);
    }

    public function update(string $id, UpdateRequest $request): RedirectResponse
    {
        $this->gasLocationRepo->update($id, $request->validated());
        return to_route('gas_location.index');
    }

    public function destroy(string $id): RedirectResponse
    {
        $this->gasLocationRepo->delete($id);
        return to_route('gas_location.index', request()->query());
    }
}
