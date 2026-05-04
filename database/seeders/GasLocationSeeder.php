<?php

namespace Database\Seeders;

use App\Models\GasLocation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GasLocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect([
            [
                'name' => 'Gudang Labota',
                'pic' => 'PT. STP',
                'type' => 2,
                'color' => 1,
                'latitude' => null,
                'longitude' => null,
            ],

            [
                'name' => 'Gudang Bahonsai',
                'pic' => 'PT. STP',
                'type' => 2,
                'color' => 2,
                'latitude' => null,
                'longitude' => null,
            ],

        ])->each(fn($location) => GasLocation::create($location));
    }
}
