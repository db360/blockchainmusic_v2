<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string $slug
 * @property string|null $cover_image
 * @property string|null $description
 * @property \Illuminate\Support\Carbon $release_date
 * @property numeric $price
 * @property string $genre
 * @property string|null $subgenre
 * @property bool $is_published
 * @property array|null $metadata
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Favorite> $favorites
 * @property-read int|null $favorites_count
 * @property-read string $total_duration
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Purchase> $purchases
 * @property-read int|null $purchases_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Song> $songs
 * @property-read int|null $songs_count
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album byGenre(string $genre)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album bySubGenre(string $subgenre)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album published()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album whereCoverImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album whereGenre($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album whereIsPublished($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album whereMetadata($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album whereReleaseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album whereSubgenre($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Album withoutTrashed()
 */
	class Album extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property string $id
 * @property int $user_id
 * @property string $favoritable_type
 * @property int $favoritable_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $favoritable
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Favorite newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Favorite newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Favorite query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Favorite whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Favorite whereFavoritableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Favorite whereFavoritableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Favorite whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Favorite whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Favorite whereUserId($value)
 */
	class Favorite extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property string $id
 * @property int $user_id
 * @property string $title
 * @property string $slug
 * @property string|null $description
 * @property string|null $cover_image
 * @property bool $is_public
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Song> $songs
 * @property-read int|null $songs_count
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Playlist newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Playlist newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Playlist public()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Playlist query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Playlist whereCoverImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Playlist whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Playlist whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Playlist whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Playlist whereIsPublic($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Playlist whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Playlist whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Playlist whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Playlist whereUserId($value)
 */
	class Playlist extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property string $id
 * @property int $user_id
 * @property string $purchaseable_type
 * @property int $purchaseable_id
 * @property string $transaction_id
 * @property numeric $amount
 * @property string $status
 * @property string $payment_method
 * @property array|null $metadata
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $purchaseable
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase completed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase whereMetadata($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase wherePaymentMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase wherePurchaseableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase wherePurchaseableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase whereTransactionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Purchase whereUserId($value)
 */
	class Purchase extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $album_id
 * @property int $user_id
 * @property string $title
 * @property string $file_url
 * @property string $duration
 * @property numeric $price
 * @property int $track_number
 * @property string|null $lyrics
 * @property string $genre
 * @property string|null $subgenre
 * @property array|null $metadata
 * @property int $play_count
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\Album $album
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Playlist> $playlists
 * @property-read int|null $playlists_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Purchase> $purchases
 * @property-read int|null $purchases_count
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song byGenre(string $genre)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song bySubgenre(string $subgenre)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song whereAlbumId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song whereDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song whereFileUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song whereGenre($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song whereLyrics($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song whereMetadata($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song wherePlayCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song whereSubgenre($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song whereTrackNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Song withoutTrashed()
 */
	class Song extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $role
 * @property string $password
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string|null $profile_picture
 * @property string|null $bio
 * @property string|null $wallet_address
 * @property string|null $socal_links
 * @property string|null $provider
 * @property string|null $provider_id
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Album> $albums
 * @property-read int|null $albums_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Favorite> $favorites
 * @property-read int|null $favorites_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Playlist> $playlists
 * @property-read int|null $playlists_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Purchase> $purchases
 * @property-read int|null $purchases_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Song> $songs
 * @property-read int|null $songs_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Sanctum\PersonalAccessToken> $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereBio($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereProfilePicture($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereProvider($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereProviderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereSocalLinks($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereWalletAddress($value)
 */
	class User extends \Eloquent {}
}

