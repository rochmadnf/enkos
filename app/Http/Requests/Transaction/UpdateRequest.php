<?php

namespace App\Http\Requests\Transaction;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'transaction_date' => ['required', 'date'],
            'location_id' => ['required', 'uuid', 'exists:gas_locations,id'],
            'gas_cylinder_id' => ['required', 'uuid', 'exists:gas_cylinders,id'],
            'purchase_type' => ['required', 'integer', 'in:1,2'],
            'price_type' => ['required', 'integer', 'in:1,2'],
            'quantity' => ['required', 'integer', 'min:1'],
            'unit_price' => ['required', 'integer', 'min:0'],
            'total_price' => ['required', 'integer', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'transaction_date.required' => 'Tanggal transaksi harus diisi.',
            'location_id.required' => 'Lokasi harus dipilih.',
            'location_id.exists' => 'Lokasi tidak valid.',
            'gas_cylinder_id.required' => 'Tabung gas harus dipilih.',
            'gas_cylinder_id.exists' => 'Tabung gas tidak valid.',
            'purchase_type.required' => 'Tipe pembelian harus dipilih.',
            'purchase_type.in' => 'Tipe pembelian tidak valid.',
            'price_type.required' => 'Tipe harga harus dipilih.',
            'price_type.in' => 'Tipe harga tidak valid.',
            'quantity.required' => 'Jumlah harus diisi.',
            'quantity.min' => 'Jumlah minimal 1.',
            'unit_price.required' => 'Harga satuan harus diisi.',
            'total_price.required' => 'Total harga harus diisi.',
        ];
    }
}
