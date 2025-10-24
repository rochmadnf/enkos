<?php

namespace App\Http\Requests\GasCylinder;

use Illuminate\Database\Query\Builder;
use Illuminate\Validation\Rule;

class StoreRequest extends GasCylinderRequest
{
    public function rules(): array
    {
        $rules = $this->getRules();

        $rules['name'][] = Rule::unique('gas_cylinders', 'name')->where(fn(Builder $query) => $query->where('purchase_type', request()->purchase_type));

        return $rules;
    }
}
