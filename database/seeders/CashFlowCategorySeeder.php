<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CashFlowCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        collect([
            [
                'name' => 'Dana Keluar Lainnya',
                'flow_type_id' => 2,
            ],
            [
                'name' => 'Dana Masuk Lainnya',
                'flow_type_id' => 1,
            ],
            [
                'name' => 'PRIVE',
                'flow_type_id' => 2,
            ],
            [
                'name' => 'Angsuran',
                'flow_type_id' => 2,
            ],
            [
                'name' => 'Gaji Karyawan',
                'flow_type_id' => 2,
            ],
            [
                'name' => 'Maintenance',
                'flow_type_id' => 2,
            ],
            [
                'name' => 'Penjualan Tabung Gas',
                'flow_type_id' => 1,
            ],
            [
                'name' => 'Ongkos Jalan',
                'flow_type_id' => 2,
            ],
            [
                'name' => 'Bonus Supir',
                'flow_type_id' => 2,
            ]
        ])->each(function ($item) {
            \App\Models\Finance\CashFlowCategory::create($item);
        });
    }
}
