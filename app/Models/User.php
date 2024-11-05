<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

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

    public function albums(): HasMany {
        return $this->hasMany(Album::class);
    }

    public function songs(): HasMany {
        return $this->hasMany(Song::class);
    }

    public function playlists(): HasMany {
        return $this->hasMany(Playlist::class);
    }

    public function favoriteAlbums(): HasMany {
        return $this->hasMany(Favorite::class)->where('favoritable_type', Album::class);
    }

    public function favoriteSongs(): HasMany {
        return $this->hasMany(Favorite::class)->where('favoritable_type', Song::class);
    }

    public function hasRole(string $role):bool {
        return $this->role === $role;
    }

    public function isArtist():bool {
        return $this->hasRole('artist');
    }

    public function hasPurchased($item): bool {
        return $this->purchases()
            ->where('purchaseable_type', get_class($item))
            ->where('purchaseable_id', $item->id)
            ->exists();
    }

}
