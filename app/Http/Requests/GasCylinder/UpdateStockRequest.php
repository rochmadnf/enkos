<?php

namespace App\Http\Requests\GasCylinder;

use App\Models\Features\GasCylinder;

class UpdateStockRequest extends GasCylinderRequest
{
    protected function prepareForValidation()
    {
        $gC = GasCylinder::findOrFail($this->request->get('gas_cylinder_id'));

        $this->totalStock = $gC->total_stock;

        $selectedConditionStock = $gC->histories
            ->where('id', $this->route()->parameter('history_id'))
            ->sum('stock');

        $this->allConditionStock = $gC->all_condition_stock - $selectedConditionStock;
    }

    public function rules(): array
    {
        $rules = $this->getStockRules();

        $rules['stock'][] = 'max:' . ($this->totalStock - $this->allConditionStock);

        return $rules;
    }
}
