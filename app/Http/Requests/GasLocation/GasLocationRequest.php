<?php

namespace App\Http\Requests\GasLocation;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GasLocationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function getRules(): array
    {
        return [
            'name' => ['bail', 'required', 'string', 'min:3', 'max:100'],
            'pic' => ['bail', 'required', 'string', 'min:3', 'max:50'],
            'type' => ['bail', 'required', Rule::enum(\App\Enums\GasLocation\TypeEnum::class)],
            'latitude' => ['bail', 'nullable', Rule::requiredIf(fn() => !is_null(request()->longitude)), 'numeric', 'between:-90,90'],
            'longitude' => ['bail', 'nullable', Rule::requiredIf(fn() => !is_null(request()->latitude)), 'numeric', 'between:-180,180'],
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'Nama Lokasi',
            'pic' => 'Penanggung Jawab',
            'type' => 'Tipe Lokasi',
            'longitude' => 'Garis Bujur',
            'latitude' => 'Garis Lintang',
        ];
    }
}
