<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    protected function getRules(): array
    {
        return [
            'name' => ['bail', 'required', 'string', 'min:3', 'max:100'],
            'capital_price' => ['bail', 'required', 'integer', 'min:0'],
            'selling_price' => ['bail', 'required', 'integer', 'min:0'],
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'Nama Produk',
            'capital_price' => 'Harga Modal',
            'selling_price' => 'Harga Jual',
        ];
    }
}
