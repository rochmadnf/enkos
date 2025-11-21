<?php

namespace App\Models\Features;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class GasCylinder extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['name', 'total_stock'];

    public function uniqueIds(): array
    {
        return ['id'];
    }

    public function histories()
    {
        return $this->hasMany(\App\Models\Features\GasCylinderHistory::class, 'gas_cylinder_id');
    }
}
