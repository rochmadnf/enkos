<?php

namespace App\Models\Features;

use App\Enums\GasCylinder\ConditionTypeEnum;
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

    protected $keyType = 'string';
    public $incrementing = false;

    public function uniqueIds(): array
    {
        return [
            'id'
        ];
    }

    public function casts()
    {
        return [
            'status' => ConditionTypeEnum::class,
        ];
    }
}
