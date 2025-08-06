<?php

namespace App\Http\Controllers;

use App\Enums\GasLocation\TypeEnum;
use App\Http\Requests\GasLocation\{StoreRequest, UpdateRequest};
use App\Http\Resources\GasLocationResource;
use App\Repositories\Contracts\GasLocationRepositoryInterface;
use Illuminate\Http\RedirectResponse;
use Inertia\Response as InertiaResponse;

class GasLocationController extends Controller
{
    public function __construct(protected GasLocationRepositoryInterface $gasLocationRepo) {}

    public function index(): InertiaResponse
    {
        return inertia('gas-location/index', [
            'page' => $this->pageMeta('Lokasi Tabung', 'Menampilkan seluruh daftar lokasi tabung gas.'),
            'resources' => $this->gasLocationRepo->paginate(),
        ]);
    }

    public function create(): InertiaResponse
    {
        return inertia('gas-location/add', [
            'page' => $this->pageMeta('Tambah Lokasi', 'Form untuk menambah lokasi tabung gas.', [
                ['id' => 'glbrc_001', 'href' => route('gas_location.index'), 'label' => 'Lokasi Tabung'],
            ]),
            'type' => TypeEnum::toArray(),
        ]);
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $this->gasLocationRepo->create($request->validated());
        return to_route('gas_location.index');
    }

    public function edit(string $id): InertiaResponse
    {
        $gasLocation = $this->gasLocationRepo->find($id);

        return inertia('gas-location/edit', [
            'page' => $this->pageMeta('Ubah Data Lokasi', 'Form untuk ubah data lokasi tabung gas.', [
                ['id' => 'glbrc_001', 'href' => route('gas_location.index'), 'label' => 'Lokasi Tabung'],
            ]),
            'type' => TypeEnum::toArray(),
            'location' => new GasLocationResource($gasLocation),
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

    /**
     * Generate page meta info.
     */
    private function pageMeta(string $name, string $description, array $breadcrumbs = []): array
    {
        return [
            'uuid' => 'mni_003',
            'name' => $name,
            'description' => $description,
            'breadcrumbs' => array_merge($breadcrumbs, [['id' => 'glbrc_last', 'href' => '#', 'label' => $name]]),
        ];
    }
}
