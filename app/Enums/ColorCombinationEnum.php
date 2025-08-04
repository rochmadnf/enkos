<?php

namespace App\Enums;

enum ColorCombinationEnum: int
{
    case SUNSET_CORAL = 1;
    case ROYAL_GOLD = 2;
    case FOREST_BREEZE = 3;
    case OCEAN_MIST = 4;
    case PLUM_ELEGANCE = 5;
    case MIDNIGHT_PURPLE = 6;
    case LEMON_SPRING = 7;
    case RUBY_GLOW = 8;
    case EMERALD_MIST = 9;
    case CHOCOLATE_CREAM = 10;
    case SKYLINE = 11;
    case TROPICAL_SUN = 12;
    case SANDY_BEACH = 13;
    case MINTY_FRESH = 14;
    case VINTAGE_WINE = 15;

    public function background(): string
    {
        return match ($this) {
            self::SUNSET_CORAL => '#2C1A1D',
            self::ROYAL_GOLD => '#1E1E2F',
            self::FOREST_BREEZE => '#1C3A2C',
            self::OCEAN_MIST => '#0A2239',
            self::PLUM_ELEGANCE => '#2E1A47',
            self::MIDNIGHT_PURPLE => '#1B0033',
            self::LEMON_SPRING => '#1C2F0F',
            self::RUBY_GLOW => '#3B0A0A',
            self::EMERALD_MIST => '#103F2E',
            self::CHOCOLATE_CREAM => '#3E2723',
            self::SKYLINE => '#001F3F',
            self::TROPICAL_SUN => '#3A2000',
            self::SANDY_BEACH => '#4E3B31',
            self::MINTY_FRESH => '#1F3D32',
            self::VINTAGE_WINE => '#2C0E1F',
        };
    }

    public function text(): string
    {
        return match ($this) {
            self::SUNSET_CORAL => '#FF7F7F',
            self::ROYAL_GOLD => '#FFD700',
            self::FOREST_BREEZE => '#A8E6A3',
            self::OCEAN_MIST => '#63D2FF',
            self::PLUM_ELEGANCE => '#D9B3FF',
            self::MIDNIGHT_PURPLE => '#B980FF',
            self::LEMON_SPRING => '#DFFF70',
            self::RUBY_GLOW => '#FF4C4C',
            self::EMERALD_MIST => '#6FFFB0',
            self::CHOCOLATE_CREAM => '#D7CCC8',
            self::SKYLINE => '#4FC3F7',
            self::TROPICAL_SUN => '#FFB74D',
            self::SANDY_BEACH => '#FFE0B2',
            self::MINTY_FRESH => '#A7FFEB',
            self::VINTAGE_WINE => '#FF99CC',
        };
    }

    public function combo(): array
    {
        return ['bg' => $this->background(), 'text' => $this->text()];
    }
}
