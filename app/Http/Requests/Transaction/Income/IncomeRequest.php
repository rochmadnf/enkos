<?php

namespace App\Http\Requests\Transaction\Income;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IncomeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function getRules(): array
    {
        return [
            'product_id' => ['bail', 'required', Rule::exists('products', 'id')],
            'quantity' => ['bail', 'required', 'integer', 'min:1'],
            'capital_price' => ['bail', 'required', 'integer', 'min:1'],
            'selling_price' => ['bail', 'required', 'integer', 'min:1'],
        ];
    }

    public function attributes()
    {
        return ['product_id' => 'Produk', 'quantity' => 'Qty'];
    }

    public function messages()
    {
        return [
            'product_id' => [
                'required' => 'Produk wajib dipilih.'
            ],
        ];
    }
}
