<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'profile_picture',
        'bio',
        'wallet_address',
        'socal_links',
        'provider',
        'provider_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];


    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'social_links' => 'array',
        ];
    }

    public function albums(): HasMany
    {
        return $this->hasMany(Album::class);
    }

    public function songs(): HasMany
    {
        return $this->hasMany(Song::class);
    }

    public function playlists(): HasMany
    {
        return $this->hasMany(Playlist::class);
    }

    // FAVORITES
    public function favorites(): HasMany
    {
        return $this->hasMany(Favorite::class);
    }

    public function hasLikedAlbum(Album $album): bool
    {
        return $this->favorites()
            ->where('favoritable_type', Album::class)
            ->where('favoritable_id', $album->id)
            ->exists();
    }

    public function favorite($model)
    {
        return $this->favorites()->create([
            'favoritable_type' => get_class($model),
            'favoritable_id' => $model->id
        ]);
    }

    public function unfavorite($model)
    {
        return $this->favorites()
            ->where('favoritable_type', get_class($model))
            ->where('favoritable_id', $model->id)
            ->delete();
    }


    // ROLES

    public function hasRole(string $role): bool
    {
        return $this->role === $role;
    }

    public function isArtist(): bool
    {
        return $this->hasRole('artist');
    }

    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }

    // PURCHASES
    public function purchasedAlbums()
    {
        return $this->purchases()
        ->where('purchaseable_type', Album::class)
        ->with('purchaseable');
    }

    public function purchasedSongs()
    {
        return $this->purchases()
        ->where('purchaseable_type', Song::class)
        ->with('purchaseable');
    }
}
