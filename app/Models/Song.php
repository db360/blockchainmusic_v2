<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Song extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'album_id',
        'user_id',
        'title',
        'file_url',
        'duration',
        'price',
        'track_number',
        'lyrics',
        'genre',
        'metadata',
        'play_count',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'metadata' => 'array',
            'play_count' => 'integer'
        ];
    }

    protected $with = ['album'];

    public function album(): BelongsTo {
        return $this->belongsTo(Album::class);
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function playlists(): BelongsToMany {
        return $this->belongsToMany(Playlist::class)
            ->withTimestamps()
            ->withPivot('position');
    }

    public function purchases(): MorphMany {
        return $this->morphMany(Purchase::class, 'purchaseable');
    }

    public function incrementPlayCount(): void {
        $this->increment('play_count');
    }

    public function scopeByGenre($query, string $genre){
        return $query->where('genre', $genre);
    }
}
