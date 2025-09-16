<?php

namespace App\Http\Controllers;

use Inertia\Response as InertiaResponse;

class GasCylinderController extends Controller
{
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

    public function create(): InertiaResponse
    {
        return inertia('gas-cylinder/add', [
            'page' => [
                'uuid' => 'mni_002',
                'name' => ($pageName = 'Tambah Tabung Gas'),
                'description' => 'Form untuk menambah jenis tabung gas.',
                'breadcrumbs' => [
                    ['id' => 'gcbrc_001', 'href' => route('gas_cylinder.index'), 'label' => 'Tabung Gas'],
                    ['id' => 'gcbrc_002', 'href' => '#', 'label' => $pageName],
                ],
            ],
        ]);
    }
}
