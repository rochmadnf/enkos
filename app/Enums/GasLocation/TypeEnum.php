<?php

namespace App\Enums\GasLocation;

enum TypeEnum: int
{
    case TRUCK = 1;
    case WAREHOUSE = 2;
    case BASE = 3;

    public function iconName(): string
    {
        return match ($this) {
            self::TRUCK => 'Truck',
            self::WAREHOUSE => 'Warehouse',
            self::BASE => 'Store',
        };
    }

    public function nameId(): string
    {
        return match ($this) {
            self::TRUCK => 'Truk',
            self::BASE => 'Pangkalan',
            self::WAREHOUSE => 'Gudang',
        };
    }

    public function first(): array
    {
        return [
            'icon' => $this->iconName(),
            'lang' => ['id' => $this->nameId()],
        ];
    }

    public static function toArray(): array
    {
        return array_map(
            fn($case) => [
                'id' => $case->value,
                'name' => [
                    'en' => ucwords(strtolower(str_replace('_', ' ', $case->name))),
                    'id' => $case->nameId(),
                ],
            ],
            self::cases(),
        );
    }
}
