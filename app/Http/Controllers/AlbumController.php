<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Purchase;
use App\Models\Song;
use Google\Cloud\Storage\Bucket;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AlbumController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $albums = Album::with('user')
            ->where('is_published', true)
            ->latest()
            ->paginate(12);

        // Obtener los IDs de los álbumes que le gustan al usuario
        $userLikes = $user ? $user->favorites()
            ->where('favoritable_type', Album::class)
            ->pluck('favoritable_id')
            ->toArray() : [];



        return Inertia::render('Albums/Index', [
            'albums' => $albums,
            'userLikes' => $userLikes
        ]);
    }
    public function userAlbums()
    {

        $user = Auth::user();



        if ($user->role === 'artist') {

            $albums = Album::with('user') // Cargar la relación 'user'
                ->where('user_id', $user->id) // Filtrar por el ID del usuario
                ->latest()
                ->paginate(12);

            return Inertia::render('Albums/UserAlbums', [
                'albums' => $albums,
                'role' => $user->role

            ]);
        }

        if ($user->role === 'user') {
            $purchases = Purchase::where('user_id', $user->id)
            ->with('purchaseable') // Carga la relación polimórfica
            ->get();

        $purchasedAlbums = $purchases->filter(function ($purchase) {
            return $purchase->purchaseable_type === Album::class;
        })->map(function ($purchase) {
            return $purchase->purchaseable;
        });

        $purchasedSongs = $purchases->filter(function ($purchase) {
            return $purchase->purchaseable_type === Song::class;
        })->map(function ($purchase) {
            return $purchase->purchaseable;
        });

        return Inertia::render('Albums/UserAlbums', [
            'albums' => $purchasedAlbums->values(), // Devuelve solo los valores del array
            'songs' => $purchasedSongs->values(),
            'role' => $user->role
        ]);
        }
    }

    public function showAlbum($id, Bucket $firebaseStorage)
    {
        // dd($id);

        $album = Album::with(['songs', 'user'])->findOrFail($id);

        // Generar Signed URLs para cada canción
        $songsWithSignedUrls = $album->songs->map(function ($song) use ($firebaseStorage) {
            $songObject = $firebaseStorage->object($song->file_url);

            // Generar una URL firmada válida por 1 hora
            $AudioSignedUrl = $songObject->signedUrl(
                new \DateTime('+1 hour'),  // Duración de la URL firmada
                [
                    'version' => 'v4',  // Utiliza la versión 4 de la firma
                ]
            );

            // Agregar la URL firmada a la canción
            $song->song_signed_url = $AudioSignedUrl;
            return $song;
        });



        return Inertia::render('Albums/ShowAlbum', [
            'album' => $album,
            'songs' => $songsWithSignedUrls,
            'user' => $album->user
        ]);
    }
}
