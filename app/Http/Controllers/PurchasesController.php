<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Purchase;
use App\Models\Song;
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

          // Separamos albums y canciones
          $salesAlbums = $sales->filter(function ($purchase) {
            return $purchase->purchaseable_type === 'App\Models\Album';
        })->values();

        $salesSongs = $sales->filter(function ($purchase) {
            return $purchase->purchaseable_type === 'App\Models\Song';
        })->values();

        return Inertia::render('Albums/ArtistSales', [
            'salesAlbums' => $salesAlbums,
            'salesSongs' => $salesSongs
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
        })->values();

        $purchasedSongs = $purchases->filter(function ($purchase) {
            return $purchase->purchaseable_type === 'App\Models\Song';
        })->values();

        return Inertia::render('Albums/UserPurchases', [
            'purchasedAlbums' => $purchasedAlbums,
            'purchasedSongs' => $purchasedSongs
        ]);
    }

    public function showCart() {

        return Inertia::render('Purchases/Cart');

    }

    public function checkout(Request $request) {

        $request->validate([
            'items' => 'required|array',
            'total' => 'required|numeric',
            'tax' => 'required|numeric'
        ]);

        $items = $request->input('items');
        $totalRequest = $request->input('total');
        $tax = $request->input('tax');

        $albums = [];
        $songs = [];
        $total = 0.00;

        foreach($items as $item) {
            if($item['type'] === 'Album') {
                $album = Album::findOrFail($item['id']);
                $total += $album->price;
                $albums[] = $album;
            } else {
                $song = Song::findOrFail($item['id']);
                $total += $song->price;
                $songs[] = $song;
            }
        }

        if(count($albums) > 0 || count($songs) > 0) {
            if($total === $totalRequest && $tax === $total * 0.005) {
                dd('DE LUJO, TOTAL IGUAL');
            }
        }

        // VERIFICADO CON LA BASE DE DATOS
        // TODO: CHECKOUT CON STRIPE O METAMASK


        return Inertia::render('Purchases/Checkout');

    }


}
