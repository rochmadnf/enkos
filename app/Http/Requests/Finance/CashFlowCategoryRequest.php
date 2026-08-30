<?php

namespace App\Http\Requests\Finance;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CashFlowCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules =  [
            'id' => ['integer', Rule::requiredIf(fn() => $this->routeIs('cash-flows.categories.update'))],
            'name' => ['required', 'string', 'min:3', 'max:200'],
            'flow_type_id' => ['required', 'integer', Rule::enum(\App\Enums\Finance\CashFlowCategoryEnum::class)],
        ];

        $rules['name'][] = Rule::unique('cash_flow_categories', 'name')->when($this->routeIs('cash-flows.categories.update'), function ($query) {
            $query->ignore($this->id);
        });

        return $rules;
    }

    public function attributes(): array
    {
        return [
            'name' => 'Nama Kategori',
            'flow_type_id' => 'Tipe Arus Kas',
        ];
    }
}
