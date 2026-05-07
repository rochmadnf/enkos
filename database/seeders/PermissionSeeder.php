<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // set models
        $roleModel = app(config('permission.models.role'));
        $permissionModel = app(config('permission.models.permission'));

        // create main role
        $roleModel::firstOrCreate(['name' => config('permission.superior_role_name')], []);

        // create permissions
        collect([
            [
                "name" => "Akun Pengguna",
                "children" => [
                    ["name" => "read users", "label" => "Dapat melihat daftar Akun Pengguna."],
                    ["name" => "create users", "label" => "Dapat membuat Akun Pengguna."],
                    ["name" => "update users", "label" => "Dapat memperbarui data pada Akun Pengguna."],
                    ["name" => "delete users", "label" => "Dapat menghapus Akun Pengguna."],
                    ["name" => "reset password users", "label" => "Dapat mereset kata sandi Akun Pengguna."],
                    ["name" => "deactivate users", "label" => "Dapat mengaktifkan/menonaktifkan Akun Pengguna."],
                ]
            ],
            [
                "name" => "Transaksi",
                "children" => [
                    ["name" => "read transactions", "label" => "Dapat melihat daftar Transaksi."],
                    ["name" => "create transactions", "label" => "Dapat membuat Transaksi."],
                    ["name" => "update transactions", "label" => "Dapat memperbarui data pada Transaksi."],
                    ["name" => "delete transactions", "label" => "Dapat menghapus Transaksi."],
                ]
            ],
        ])->each(function ($permission) use ($permissionModel) {
            $groupName = $permission['name'];

            collect($permission['children'])
                ->each(function ($child) use ($groupName, $permissionModel) {
                    $p = $permissionModel::firstOrCreate(
                        [
                            'name' => $child['name'],
                        ],
                        [
                            'group_name' => $groupName,
                            'label' => $child['label'],
                        ]
                    );

                    $this->command->info("Permission '{$child['name']}'" . ($p->wasRecentlyCreated ? " created." : " exists."));
                });
        });

        // set cashier role
        $cashierRole = $roleModel::firstOrCreate(['name' => 'Kasir'], []);

        // assign permissions to cashier role
        $cashierPermissions = $permissionModel::whereIn('name', ['read transactions', 'create transactions', 'update transactions', 'delete transactions'])->get();
        $cashierRole->syncPermissions($cashierPermissions);
    }
}
