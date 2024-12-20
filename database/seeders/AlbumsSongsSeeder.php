<?php

namespace Database\Seeders;

use App\Models\Album;
use App\Models\Playlist;
use App\Models\Purchase;
use App\Models\PurchaseItem;
use App\Models\Song;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class AlbumsSongsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    private function rand_color()
    {
        return str_pad(dechex(mt_rand(0, 0xFFFFFF)), 6, '0', STR_PAD_LEFT);
    }

    public function run(): void
    {


        $faker = Faker::create();

        $numAlbums = 25;

        // Ruta al archivo JSON
        $jsonFilePath = resource_path('/data/genres.json');

        // Leer el archivo JSON
        $jsonContent = file_get_contents($jsonFilePath);

        // Convertir el contenido JSON a un array asociativo
        $genres = json_decode($jsonContent, true);

        // Paso 1: Selecciona un género aleatorio
        $genreKeys = array_keys($genres);

        $numUsers = 20;

        foreach (range(1, $numUsers) as $index) {
            User::create([
                'name' => $faker->name(),
                'email' => $faker->unique()->email(),
                'role' => $faker->randomElement(['user', 'artist', 'admin']),
                'password' => bcrypt('password'),
                'bio' => $faker->sentence(10),
                'wallet_address' => $faker->uuid(),
                'social_links' => json_encode(['twitter' => $faker->url(), 'instagram' => $faker->url()]),
            ]);

        };

        $artists = User::where('role', 'artist')->get();

        foreach($artists as $artist) {
            foreach (range(1, 5) as $index) {
                $randomColor = $this->rand_color();
                $title = $faker->sentence(2);
                $slug = \Str::slug($title) . '-' . $faker->unique()->randomNumber();

                $album = Album::create([
                    'user_id' => $artist->id,
                    'title' => $title,
                    'slug' => $slug,
                    'description' => $faker->paragraph(),
                    'release_date' => $faker->date(),
                    'price' => $faker->randomFloat(2, 5, 20),
                    'genre' => $faker->word(),
                    'subgenre' => $faker->word(),
                    'cover_image' => "https://fakeimg.pl/600x400/$randomColor/909090?text=$title",
                    'is_published' => $faker->boolean(80),
                ]);

                // Crear canciones asociadas al álbum
                foreach (range(1, $faker->numberBetween(2, 10)) as $trackNumber) {
                    Song::create([
                        'album_id' => $album->id,
                        'user_id' => $artist->id,
                        'title' => $faker->sentence(3),
                        'file_url' => '/storage/audio/audio-' . $faker->uuid() . '.mp3',
                        'duration' => $faker->time('i:s'),
                        'price' => $faker->randomFloat(2, 0.99, 2.99),
                        'track_number' => $trackNumber,
                        'genre' => $album->genre,
                        'subgenre' => $album->subgenre,
                        'play_count' => $faker->numberBetween(0, 1000),
                    ]);
                }

                // Crear playlists para cada artista
                $playlist = Playlist::create([
                    'user_id' => $artist->id,
                    'title' => $faker->sentence(3),
                    'slug' => \Str::slug($faker->sentence(3)),
                    'description' => $faker->paragraph(),
                    'cover_image' => "https://fakeimg.pl/600x400/$randomColor/909090?text=Playlist",
                    'is_public' => $faker->boolean(80),
                ]);

                // Asignar canciones a la playlist
                $songs = $album->songs()->inRandomOrder()->limit(3)->get();
                foreach ($songs as $song) {
                    $playlist->songs()->attach($song->id, ['position' => $faker->numberBetween(1, 10)]);
                }
            }
        }

        // Crear compras aleatorias para usuarios
foreach (range(1, 10) as $index) {
    $user = User::where('role', 'user')->inRandomOrder()->first();

    // Seleccionar un número aleatorio de items (álbumes o canciones)
    $itemCount = $faker->numberBetween(1, 3);
    $total = 0;

    // Crear una compra
    $purchase = Purchase::create([
        'user_id' => $user->id,
        'transaction_id' => $faker->uuid(),
        'total' => 0, // Calcularemos esto después
        'status' => $faker->randomElement(['pending', 'completed', 'failed']),
        'payment_method' => $faker->randomElement(['stripe', 'paypal', 'crypto']),
        'metadata' => json_encode([
            'original_source' => 'seeder',
            'additional_info' => $faker->sentence()
        ])
    ]);

    // Mezclar álbumes y canciones
    $items = collect();
    $items = $items->merge(Album::inRandomOrder()->limit($faker->numberBetween(0, 2))->get())
        ->merge(Song::inRandomOrder()->limit($itemCount)->get());

    // Crear purchase items
    foreach ($items as $item) {
        $purchaseItem = PurchaseItem::create([
            'purchase_id' => $purchase->id,
            'purchaseable_type' => get_class($item),
            'purchaseable_id' => $item->id,
            'item_price' => $item->price
        ]);

        $total += $item->price;
    }

    // Actualizar el total de la compra
    $purchase->update([
        'total' => $total
    ]);
}

        // // Crear compras aleatorias para usuarios
        // foreach (range(1, 10) as $index) {
        //     $user = User::where('role', 'user')->inRandomOrder()->first();
        //     $song = Song::inRandomOrder()->first();

        //     $user->purchases()->create([
        //         'purchaseable_id' => $song->id,
        //         'purchaseable_type' => Song::class,
        //         'amount' => $song->price,
        //         'status' => $faker->randomElement(['pending', 'completed', 'failed']),
        //         'payment_method' => $faker->randomElement(['paypal', 'crypto']),
        //         'transaction_id' => $faker->uuid(),
        //     ]);
        // }

        // Crear favoritos
        foreach (range(1, 10) as $index) {
            $user = User::where('role', 'user')->inRandomOrder()->first();
            $song = Song::inRandomOrder()->first();

            $user->favorites()->create([
                'favoritable_id' => $song->id,
                'favoritable_type' => Song::class,
            ]);
        }

    }
}
