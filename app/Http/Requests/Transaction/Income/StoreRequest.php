<?php

namespace App\Http\Requests\Transaction\Income;

use App\Models\IncomeTrx;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;

class StoreRequest extends IncomeRequest
{

    public function rules(): array
    {
        $rules = $this->getRules();

        return $rules;
    }

    public function whenFulfill()
    {
        try {
            DB::beginTransaction();
            IncomeTrx::create(['qty' => $this->validated()['quantity'], ...$this->validated()]);
            DB::commit();
        } catch (\Throwable $error) {
            DB::rollBack();
            throw $error;
        };
    }
}
