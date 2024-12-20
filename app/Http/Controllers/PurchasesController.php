<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Purchase;
use App\Models\PurchaseItem;
use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PurchasesController extends Controller
{
    public function artistSales()
    {
        $user = Auth::user();

        // Obtener todos los purchase items donde el elemento comprado pertenece al artista actual
        $purchaseItems = PurchaseItem::whereHasMorph(
            'purchaseable',
            [Album::class, Song::class],
            function ($query) use ($user) {
                $query->where('user_id', $user->id);
            }
        )->with(['purchaseable', 'purchase'])->get();

        // Separar álbumes y canciones
        $salesAlbums = $purchaseItems->filter(function ($purchaseItem) {
            return $purchaseItem->purchaseable_type === Album::class;
        })->values();

        $salesSongs = $purchaseItems->filter(function ($purchaseItem) {
            return $purchaseItem->purchaseable_type === Song::class;
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

        $user = Auth::user();


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
                    // VERIFICADO CON LA BASE DE DATOS

                    // GUARDAR PURCHASES

                    // Purchase::create(['user_id' => $user->id, 'purchaseable_type' => 'mixed', 'purchaseable_id' => ...]);

                    // TODO: CHECKOUT CON STRIPE O METAMASK

            } else {
                // TODO: ERROR: No coinciden los datos cliente con los de la BD
            }
        } else {
            // TODO: Error, no hay albums ni songs
        }

        return Inertia::render('Purchases/Checkout');

    }


}
