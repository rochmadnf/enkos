<?php

namespace App\Http\Requests\Product;

use App\Models\PriceLog;
use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class StoreRequest extends ProductRequest
{
    public function rules(): array
    {
        $rules = $this->getRules();

        $rules['name'][] = Rule::unique('products', 'name');

        return $rules;
    }

    public function whenFulfill()
    {
        try {
            DB::beginTransaction();
            $product = Product::create(['name' => $this->validated()['name']]);

            // Harga Modal
            PriceLog::create(['product_id' => $product->id, 'price' => $this->validated()['capital_price'], 'type' => 'capital']);

            // Harga Jual
            PriceLog::create(['product_id' => $product->id, 'price' => $this->validated()['selling_price'], 'type' => 'sell']);
            DB::commit();
        } catch (\Throwable $error) {
            DB::rollBack();
            throw $error;
        };
    }
}
