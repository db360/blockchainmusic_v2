<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Album extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'cover_image',
        'description',
        'release_date',
        'price',
        'genre',
        'is_published',
        'metadata'
    ];

    protected function casts(): array
    {
        return [
            'release_date' => 'datetime',
            'price' => 'decimal:2',
            'is_published' => 'boolean',
            'metadata' => 'array'
        ];
    }

    protected $with = ['user'];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function songs(): HasMany {
        return $this->hasMany(Song::class)->orderBy('track_number');
    }

    public function purchases(): MorphMany {
        return $this->morphMany(Purchase::class, 'purchaseable');
    }
}
