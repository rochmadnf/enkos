<?php

namespace App\Models\Features;

use App\Enums\Transaction\PriceTypeEnum;
use App\Enums\Transaction\PurchaseTypeEnum;
use App\Models\GasLocation;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'transaction_date',
        'location_id',
        'gas_cylinder_id',
        'purchase_type',
        'price_type',
        'quantity',
        'unit_price',
        'total_price',
    ];

    public function uniqueIds(): array
    {
        return ['id'];
    }

    protected function casts(): array
    {
        return [
            'transaction_date' => 'date',
            'purchase_type' => PurchaseTypeEnum::class,
            'price_type' => PriceTypeEnum::class,
        ];
    }

    protected static function booted()
    {
        static::retrieved(function ($transaction) {
            // Handle legacy data: convert 0 or null to default value 1 (Pangkalan)
            if (!$transaction->price_type || $transaction->getAttributes()['price_type'] == 0) {
                $transaction->price_type = PriceTypeEnum::WHOLESALE;
            }
        });
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(GasLocation::class, 'location_id');
    }

    public function gasCylinder(): BelongsTo
    {
        return $this->belongsTo(GasCylinder::class, 'gas_cylinder_id');
    }
}
