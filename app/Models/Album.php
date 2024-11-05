<?php

namespace App\Models;

use App\Traits\GenreScopes;
use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Album extends Model
{
    use HasFactory, HasSlug, GenreScopes, SoftDeletes;

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'cover_image',
        'description',
        'release_date',
        'price',
        'genre',
        'subgenre',
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

    public function favorites():MorphMany {
        return $this->morphMany(Favorite::class, 'favoritable');
    }

    public function getTotalDurationAttribute():string{
        $totalSeconds = $this->songs->sum(function($song) {
            list($hours, $minutes, $seconds) = explode(':', $song->duration);
            return ($hours * 3600) + ($minutes * 60) + $seconds;
        });

        return sprintf(
            '%02d:%02d:%02d',
            floor($totalSeconds / 3600),
            floor(($totalSeconds % 3600) / 60),
            $totalSeconds % 60
        );
    }

    public function scopePublished($query) {
        return $query->where('is_published', true);
    }

    public function scopeByGenre($query, string $genre){
        return $query->where('genre', $genre);
    }

    public function scopeBySubGenre($query, string $subgenre){
        return $query->where('subgenre', $subgenre);
    }
}
