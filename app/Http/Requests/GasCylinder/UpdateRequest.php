<?php

namespace App\Http\Requests\GasCylinder;

use App\Models\Features\GasCylinder;
use Illuminate\Validation\Rule;

class UpdateRequest extends GasCylinderRequest
{
    private $gC = null;

    protected function prepareForValidation()
    {
        $this->gC = GasCylinder::findOrFail($this->gas_id);

        $this->allConditionStock = $this->gC->all_condition_stock;
    }

    public function rules(): array
    {
        $rules = $this->getRules();

        $gasCylinder = $this->gC;

        $rules['name'][] = Rule::unique('gas_cylinders', 'name')->ignore($this->gas_id);
        $rules['total_stock'][] = 'gte:' . $gasCylinder->all_condition_stock;

        return $rules;
    }

    public function messages(): array
    {
        $gasCylinder = $this->gC;

        return [
            'total_stock.gte' => 'Total stok tidak boleh kurang dari stok yang telah ditambahkan (' . $gasCylinder->all_condition_stock . ').',
        ];
    }
}
