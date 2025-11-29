<?php

namespace App\Http\Requests\GasCylinder;

use App\Models\Features\GasCylinder;

class AddStockRequest extends GasCylinderRequest
{

    protected function prepareForValidation()
    {
        $gC = GasCylinder::findOrFail($this->request->get('gas_cylinder_id'));

        $this->totalStock = $gC->total_stock;
        $this->allConditionStock = $gC->all_condition_stock;
    }

    public function rules(): array
    {
        $rules = $this->getStockRules();

        $rules['stock'][] = 'max:' . ($this->totalStock - $this->allConditionStock);

        return $rules;
    }
}
