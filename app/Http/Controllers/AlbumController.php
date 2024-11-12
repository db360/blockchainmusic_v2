<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Purchase;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AlbumController extends Controller
{
    public function index()
    {
        $albums = Album::with('user')
            ->where('is_published', true)
            ->latest()
            ->paginate(12);

        return Inertia::render('Albums/Index', [
            'albums' => $albums,
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
            // Obtenemos todas las compras del usuario con sus relaciones
            $purchases = Purchase::where('user_id', $user->id)
                ->with('purchaseable')  // Carga la relación polimórfica
                ->get();

            // Separamos albums y canciones
            $purchasedAlbums = $purchases
                ->where('purchaseable_type', 'App\Models\Album')
                ->pluck('purchaseable');


            return Inertia::render('Albums/UserAlbums', [
                'albums' => $purchasedAlbums,
                'role' => $user->role
            ]);
        }
    }
}
