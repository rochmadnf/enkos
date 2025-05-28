<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superUser = User::create([
            'name' => 'Super User',
            'username' => 'super_user',
            'password' => 'P4$$w0Rd',
            'avatar' => null,
        ]);
    }
}
