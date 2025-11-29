<?php

namespace App\Enums\Transaction;

enum PurchaseTypeEnum: int
{
    case CYLINDER_GAS = 1; // Tabung + Gas
    case REFILL = 2; // Refill

    public function label(): string
    {
        return match ($this) {
            self::CYLINDER_GAS => 'Tabung + Gas',
            self::REFILL => 'Refill',
        };
    }

    public static function toArray(): array
    {
        return array_map(
            fn($case) => [
                'id' => $case->value,
                'name' => $case->label(),
            ],
            self::cases(),
        );
    }
}
