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
        Schema::create('purchase_items', function(Blueprint $table) {
            $table->uuid('id')->primary(); // Especificar 'id' para el UUID
            $table->foreignUuid('purchase_id')
                ->constrained()
                ->onDelete('cascade');
            $table->morphs('purchaseable');
            $table->decimal('item_price', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_items');
    }
};
