<?php

namespace App\Http\Requests\Product;

use App\Models\PriceLog;
use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class UpdateRequest extends ProductRequest
{
    public function rules(): array
    {
        $rules = $this->getRules();


        $rules['name'][] = Rule::unique('products', 'name')->ignore($this->route()->product_id);

        return $rules;
    }

    public function whenFulfill()
    {

        try {
            DB::beginTransaction();
            $product = Product::with('price_logs')->where('id', $this->route()->product_id)->firstOrFail();

            $product->update(['name' => $this->validated()['name']]);


            // Harga Modal
            if ((int) $product->price_logs->where('type', 'capital')->sortByDesc('id')->first()->price !== (int) $this->validated()['capital_price']) {
                PriceLog::create(['product_id' => $product->id, 'price' => $this->validated()['capital_price'], 'type' => 'capital']);
            }

            // Harga Jual
            if ((int) $product->price_logs->where('type', 'sell')->sortByDesc('id')->first()->price !== (int) $this->validated()['selling_price']) {
                PriceLog::create(['product_id' => $product->id, 'price' => $this->validated()['selling_price'], 'type' => 'sell']);
            }

            DB::commit();
        } catch (\Throwable $error) {
            DB::rollBack();
            throw $error;
        };
    }
}
