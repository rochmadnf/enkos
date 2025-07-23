<?php

namespace App\Enums\GasCylinder;

enum PurchaseTypeEnum: int
{
    case CYLINDER_GAS = 1;
    case REFILL = 2;

    public function label(): string
    {
        return match ($this) {
            self::CYLINDER_GAS => 'Tabung + Gas',
            self::REFILL => 'Refill',
        };
    }
}
