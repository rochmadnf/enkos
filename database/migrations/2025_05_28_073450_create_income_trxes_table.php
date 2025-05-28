<?php

use App\Models\Product;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('income_trxes', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->index();
            $table->foreignIdFor(Product::class);
            $table->unsignedInteger('qty');
            $table->double('capital_price');
            $table->double('selling_price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('income_trxes');
    }
};
