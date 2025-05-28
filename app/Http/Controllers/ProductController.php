<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\StoreRequest;
use App\Http\Requests\Product\UpdateRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response as InertiaResponse;

class ProductController extends Controller
{
    public function index(): InertiaResponse
    {
        $products = Product::with('price_logs')->get();
        return inertia('product/index', [
            'products' => fn() => ProductResource::collection($products),
        ]);
    }

    public function create(): InertiaResponse
    {
        return inertia('product/create');
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $request->whenFulfill();
        return to_route('product.index');
    }

    public function edit(int $productId): InertiaResponse
    {
        $product = Product::with('price_logs')->where('id', $productId)->firstOrFail();
        return inertia('product/edit', [
            'product' => fn() => ProductResource::make($product),
        ]);
    }

    public function update(int $productId, UpdateRequest $request): RedirectResponse
    {

        $request->whenFulfill();

        return to_route('product.index');
    }
}
