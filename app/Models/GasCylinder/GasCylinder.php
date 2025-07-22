<?php

namespace App\Models\GasCylinder;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class GasCylinder extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['name', 'purchase_type'];

    protected function casts(): array
    {
        return [
            'purchase_type' => \App\Enums\GasCylinder\PurchaseTypeEnum::class,
        ];
    }

    public function uniqueIds(): array
    {
        return ['id'];
    }
}
