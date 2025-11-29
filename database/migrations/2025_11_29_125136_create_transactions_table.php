<?php

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
        Schema::create('transactions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->date('transaction_date');
            $table->foreignUuid('location_id')->constrained('gas_locations')->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('gas_cylinder_id')->constrained('gas_cylinders')->onDelete('restrict')->onUpdate('cascade');
            $table->unsignedTinyInteger('sale_type'); // 1=pangkalan, 2=eceran
            $table->unsignedInteger('quantity');
            $table->unsignedInteger('unit_price');
            $table->unsignedInteger('total_price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
