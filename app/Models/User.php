<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasUuids;

    protected $fillable = [
        'username',
        'name',
        'avatar',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function uniqueIds(): array
    {
        return ['uuid'];
    }

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }
}
