<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superUser = \App\Models\User::create([
            'name' => 'Super User',
            'username' => config('app.username_superior_user'),
            'password' => 'password123',
            'avatar' => null,
        ]);

        $superUser->assignRole(config('permission.superior_role_name'));

        $cashierUser = \App\Models\User::create([
            'name' => 'Kasir',
            'username' => 'kasir_01',
            'password' => 'password123',
        ]);

        $cashierUser->assignRole('Kasir');
    }
}
