<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCashFlowRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'cash_flow_category_id' => ['required', 'exists:cash_flow_categories,id'],
            'perfom_at' => ['required', 'date', 'date_format:Y-m-d'],
            'description' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'integer', 'min:1'],
        ];
    }

    public function attributes(): array
    {
        return [
            'cash_flow_category_id' => 'Jenis arus kas',
            'perfom_at' => 'Tanggal',
            'description' => 'Deskripsi',
            'amount' => 'Nominal',
        ];
    }

    public function messages(): array
    {
        return [
            'cash_flow_category_id.required' => 'Jenis arus kas harus dipilih',
            'cash_flow_category_id.exists' => 'Jenis arus kas tidak valid',
            'description.required' => 'Deskripsi harus diisi',
            'description.max' => 'Deskripsi maksimal 255 karakter',
            'amount.required' => 'Nominal harus diisi',
            'amount.integer' => 'Nominal harus berupa angka',
            'amount.min' => 'Nominal minimal 1',
        ];
    }
}
