<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCashFlowRequest;

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
            'balance' => [
                'income' => $bIncome = $this->csr->balance(type: 'credit'),
                'expense' => $bExpense = $this->csr->balance(type: 'debit'),
                'net' => $bIncome - $bExpense,
            ]
        ]);
    }

    public function store(StoreCashFlowRequest $request)
    {
        $this->csr->create($request->validated());

        return redirect()->route('cash-flows.index')->with('success', 'Arus kas berhasil ditambahkan');
    }
}
