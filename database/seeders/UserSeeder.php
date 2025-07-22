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
            'username' => 'super_user',
            'password' => 'password123',
            'avatar' => null,
        ]);

        // insert permissions
    }
}
