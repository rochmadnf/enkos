<?php

namespace App\Http\Requests\GasCylinder;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GasCylinderRequest extends FormRequest
{
    protected int $totalStock = 0; // total stok keseluruhan
    protected int $allConditionStock = 0; // total dari semua kondisi stok


    public function authorize(): bool
    {
        return true;
    }

    protected function getRules(): array
    {
        return [
            'name' => ['bail', 'required', 'string', 'min:2', 'max:255'],
            'total_stock' => ['bail', 'required', 'integer', 'min:1'],
        ];
    }

    protected function getStockRules(): array
    {
        return [
            'gas_cylinder_id' => [
                'bail',
                'required',
                Rule::exists('gas_cylinders', 'id'),
            ],
            'status' => [
                'bail',
                'required',
                Rule::enum(\App\Enums\GasCylinder\ConditionTypeEnum::class),
            ],
            'location_id' => [
                'bail',
                'required',
                Rule::exists('gas_locations', 'id'),
            ],
            'stock' => ['bail', 'required', 'integer', 'min:1'],
            'capital_price' => ['bail', 'required', 'integer', 'min:1'],
            'base_price' => ['bail', 'required', 'integer', 'min:1'],
            'retail_price' => ['bail', 'required', 'integer', 'min:1'],
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'Nama Tabung',
            'total_stock' => 'Total Stok',
            'stock' => 'Stok',
            'status' => 'Kondisi',
            'location_id' => 'Lokasi',
            'capital_price' => 'Harga Modal',
            'base_price' => 'Harga Pangkalan',
            'retail_price' => 'Harga Eceran',
        ];
    }
}
