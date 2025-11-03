<?php

namespace App\Http\Requests\GasCylinder;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GasCylinderRequest extends FormRequest
{
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

    public function attributes()
    {
        return [
            'name' => 'Nama Tabung',
            'total_stock' => 'Total Stok',
        ];
    }
}
