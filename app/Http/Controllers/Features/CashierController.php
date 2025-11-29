<?php

namespace App\Http\Controllers\Features;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CashierController extends Controller
{
    public function index()
    {
        return inertia('features/transactions/cashier/index', [
            'page' => [
                'uuid' => 'mni_004',
            ],
        ]);
    }
}
