<?php

namespace App\Http\Requests\GasCylinder;

use Illuminate\Validation\Rule;

class UpdateRequest extends GasCylinderRequest
{
    public function rules(): array
    {
        $rules = $this->getRules();

        $rules['name'][] = Rule::unique('gas_cylinders', 'name')->ignore($this->gas_id);

        return $rules;
    }
}
