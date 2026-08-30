<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCashFlowRequest;
use App\Http\Resources\Finance\CashFlowCategoryResource;
use App\Models\CashFlow;
use App\Models\Finance\CashFlowCategory;

class CashFlowController extends Controller
{
    protected int $defaultPerPage = 10;

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
            'cfCategories' => cache()->remember('cfCategories', 60, function () {
                return CashFlowCategoryResource::collection(
                    CashFlowCategory::query()
                        ->orderBy('name', 'asc')
                        ->get()
                );
            }),

            'balance' => [
                'income' => $totalPemasukan = CashFlow::income()->sum('amount'),
                'expense' => $totalPengeluaran = CashFlow::expense()->sum('amount'),
                'net' => $totalPemasukan - $totalPengeluaran,
            ]
        ]);
    }

    public function store(StoreCashFlowRequest $request)
    {
        $this->csr->create($request->validated());

        return redirect()->route('cash-flows.index')->with('success', 'Arus kas berhasil ditambahkan');
    }
}
