<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Purchase extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'purchaseable_type',
        'purchaseable_id',
        'transaction_id',
        'amount',
        'status',
        'payment_method',
        'metadata'
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'metadata' => 'array'
        ];
    }

    public function uniqueIds()
{
    return ['id'];
}

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function scopeCompleted($query) {
        return $query->where('status', 'completed');
    }

    public function scopePending($query) {
        return $query->where('status', 'pending');
    }

    public function items()
    {
        return $this->hasMany(PurchaseItem::class);
    }
}
