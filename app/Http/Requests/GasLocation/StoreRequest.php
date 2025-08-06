<?php

namespace App\Http\Requests\GasLocation;

use Illuminate\Database\Query\Builder;
use Illuminate\Validation\Rule;

class StoreRequest extends GasLocationRequest
{
    public function rules(): array
    {
        $rules = $this->getRules();

        $rules['name'][] = Rule::unique('gas_locations', 'name')->where(fn(Builder $query) => $query->where('type', request()->type));

        return $rules;
    }
}
