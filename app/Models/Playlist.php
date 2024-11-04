<?php

namespace App\Models;

use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Playlist extends Model
{
    use HasFactory, HasUuids, HasSlug;

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'description',
        'cover_image',
        'is_public',
    ];

    protected function casts(): array
    {
        return [
            'is_public' => 'boolean'
        ];
    }

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function songs(): BelongsToMany {
        return $this->belongsToMany(Song::class)
            ->withTimestamps()
            ->withPivot('position')
            ->orderBy('pivot_position');
    }

    public function scopePublic($query) {
        return $query->where('is_public', true);
    }
}
