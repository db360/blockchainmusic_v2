<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PurchasesController extends Controller
{
    public function artistSales()
    {
        $user = Auth::user();

        // Suponiendo que las ventas estén en la tabla de 'purchases'
        $sales = Purchase::whereHas('purchaseable', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->with('purchaseable')->get();

        return Inertia::render('Albums/ArtistSales', [
            'sales' => $sales
        ]);
    }

    public function userPurchases()
    {
        $user = Auth::user();

        // Obtenemos todas las compras del usuario con sus relaciones
        $purchases = Purchase::where('user_id', $user->id)
            ->with('purchaseable')  // Carga la relación polimórfica
            ->get();

        // Separamos albums y canciones
        $purchasedAlbums = $purchases->filter(function ($purchase) {
            return $purchase->purchaseable_type === 'App\Models\Album';
        });

        $purchasedSongs = $purchases->filter(function ($purchase) {
            return $purchase->purchaseable_type === 'App\Models\Song';
        });

        return Inertia::render('Albums/UserPurchases', [
            'purchasedAlbums' => $purchasedAlbums,
            'purchasedSongs' => $purchasedSongs
        ]);
    }
}
