<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;

class CashFlowController extends Controller
{
    protected int $defaultPerPage = 5;

    public function __construct(protected readonly \App\Repositories\Contracts\CashFlowsRepositoryInterface $csr)
    {
        //
    }

    public function index()
    {
        $pageName = 'Arus Kas';

        return inertia('features/cash-flow/index', [
            'page' => [
                'uuid' => 'mni_006',
                'name' => $pageName,
                'description' => 'Menampilkan seluruh pemasukan dan pengeluaran',
            ],
            'resources' => $this->csr->paginate(perPage: request()->input('per_page', $this->defaultPerPage)),
        ]);
    }
}
