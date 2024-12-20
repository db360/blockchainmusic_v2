<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseItem extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'purchase_id',
        'purchaseable_type',
        'purchaseable_id',
        'item_price' // Cambié 'quantity' ya que no lo vi en tu migración
    ];

    public function uniqueIds()
    {
        return ['id'];
    }

    public function purchase()
    {
        return $this->belongsTo(Purchase::class);
    }

    public function purchaseable()
    {
        return $this->morphTo();
    }

    
}
