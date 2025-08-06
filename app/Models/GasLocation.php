<?php

namespace App\Models;

use App\Enums\ColorCombinationEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class GasLocation extends Model
{
    use HasUuids;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = ['name', 'pic', 'type', 'icon', 'latitude', 'longitude'];

    protected static function booted()
    {
        static::creating(function ($model) {
            $model->color = (static::max('color') % count(ColorCombinationEnum::cases())) + 1;
        });
    }

    protected function casts(): array
    {
        return [
            'color' => ColorCombinationEnum::class,
            'type' => \App\Enums\GasLocation\TypeEnum::class,
        ];
    }
}
