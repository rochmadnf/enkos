<?php

namespace App\Models\Features;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class GasCylinderHistory extends Model
{
    use HasUuids;

    protected $fillable = [
        'id',
        'gas_cylinder_id',
        'location_id',
        'capital_price', // harga modal
        'base_price', // harga pangkalan
        'retail_price', // harga eceran
        'stock',
        'status', // isi, kosong, bocor/rusak
    ];

    public function uniqueIds(): array
    {
        return [
            'id'
        ];
    }

    public function gasCylinder()
    {
        return $this->belongsTo(\App\Models\Features\GasCylinder::class, 'gas_cylinder_id');
    }

    public function location()
    {
        return $this->belongsTo(\App\Models\GasLocation::class, 'location_id');
    }
}
