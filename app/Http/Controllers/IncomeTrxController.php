<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transaction\Income\StoreRequest;
use App\Http\Resources\ProductResource;
use App\Http\Resources\Transaction\IncomeResource;
use App\Models\IncomeTrx;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Inertia\Response as InertiaResponse;

class IncomeTrxController extends Controller
{
    public function index()
    {

        $transactions = IncomeTrx::with('product')->whereMonth('created_at', intval(request()->has('set_month') ? request()->get('set_month') : (int) now()->format('n')))->orderBy('created_at')->get();

        return inertia('transaction/income/index', [
            'transactions' => fn() => IncomeResource::collection($transactions)->additional([
                'total' => [
                    'qty' => $transactions->sum('qty'),
                    'price' => $transactions->sum(fn($trx) => $trx->qty * $trx->selling_price),
                    'profit' => $transactions->sum(fn($trx) => ($trx->qty * $trx->selling_price) - ($trx->qty * $trx->capital_price))
                ]
            ]),
        ]);
    }

    public function create(): InertiaResponse
    {
        $products = Product::with('price_logs')->get();
        return inertia('transaction/income/create', [
            'products' => fn() => ProductResource::collection($products),
        ]);
    }

    public function store(StoreRequest $request): RedirectResponse
    {

        $request->whenFulfill();

        return to_route('income.index');
    }
}
