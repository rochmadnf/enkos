<?php

namespace App\Models\Features;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GasCylinder extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['name', 'total_stock'];

    protected $appends = ['all_condition_stock', 'filled_stock', 'empty_stock', 'damaged_stock'];

    protected $with = ['histories'];

    public function uniqueIds(): array
    {
        return ['id'];
    }

    protected static function booted()
    {
        static::addGlobalScope('stock_sums', function (Builder $builder) {
            $builder
                ->withSum(['histories as all_condition_stock' => function ($q) {
                    $q->where('stock', '!=', 0);
                }], 'stock')
                ->withSum(['histories as filled_stock' => function ($q) {
                    $q->where('status', \App\Enums\GasCylinder\ConditionTypeEnum::FILLED);
                }], 'stock')
                ->withSum(['histories as empty_stock' => function ($q) {
                    $q->where('status', \App\Enums\GasCylinder\ConditionTypeEnum::EMPTY);
                }], 'stock')
                ->withSum(['histories as damaged_stock' => function ($q) {
                    $q->where('status', \App\Enums\GasCylinder\ConditionTypeEnum::DAMAGED);
                }], 'stock');
        });
    }

    public function histories(): HasMany
    {
        return $this->hasMany(GasCylinderHistory::class, 'gas_cylinder_id', 'id');
    }

    public function getAllConditionStockAttribute(): int
    {
        return $this->attributes['all_condition_stock'] ?? 0;
    }

    public function getFilledStockAttribute(): int
    {
        return $this->attributes['filled_stock'] ?? 0;
    }

    public function getEmptyStockAttribute(): int
    {
        return $this->attributes['empty_stock'] ?? 0;
    }

    public function getDamagedStockAttribute(): int
    {
        return $this->attributes['damaged_stock'] ?? 0;
    }
}
