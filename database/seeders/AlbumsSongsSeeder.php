<?php

namespace Database\Seeders;

use App\Models\Album;
use App\Models\Playlist;
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
        // Datos de los álbumes
        // $albums = [
        //     [
        //         'user_id' => 1,
        //         'title' => 'Midnight Dreams',
        //         'description' => 'Un viaje nocturno a través de melodías oníricas',
        //         'genre' => 'African',
        //         'subgenre' => 'Genge',
        //         'is_published' => true,
        //         'price' => 3.50,
        //         'songs' => [
        //             [
        //                 'title' => 'Luna Plateada',
        //                 'duration' => '3:45',
        //                 'track_number' => 1,
        //                 'price' => 1,
        //                 'genre' => 'African',
        //                 'user_id' => 1,
        //                 'subgenre' => 'Genge',
        //                 'file_url' => 'https://hola.com/165165156'
        //             ],
        //             [
        //                 'title' => 'Sueños de Medianoche',
        //                 'duration' => '4:12',
        //                 'track_number' => 2,
        //                 'price' => 1,
        //                 'genre' => 'African',
        //                 'subgenre' => 'Genge',
        //                 'user_id' => 1,
        //                 'file_url' => 'https://hola.com/165165156'


        //             ],
        //             [
        //                 'title' => 'Estrellas Danzantes',
        //                 'duration' => '3:58',
        //                 'track_number' => 3,
        //                 'price' => 1,
        //                 'genre' => 'African',
        //                 'subgenre' => 'Genge',
        //                 'user_id' => 1,
        //                 'file_url' => 'https://hola.com/165165156'


        //             ],
        //             [
        //                 'title' => 'Susurros del Viento',
        //                 'duration' => '4:30',
        //                 'track_number' => 4,
        //                 'price' => 1,
        //                 'genre' => 'African',
        //                 'subgenre' => 'Genge',
        //                 'user_id' => 1,
        //                 'file_url' => 'https://hola.com/165165156'


        //             ],
        //             [
        //                 'title' => 'Amanecer',
        //                 'duration' => '5:15',
        //                 'track_number' => 5,
        //                 'price' => 1,
        //                 'genre' => 'African',
        //                 'subgenre' => 'Genge',
        //                 'user_id' => 1,
        //                 'file_url' => 'https://hola.com/165165156'


        //             ],
        //         ]
        //     ],
        //     [
        //         'user_id' => 1,
        //         'title' => 'Urban Beats',
        //         'description' => 'Ritmos urbanos con toques electrónicos',
        //         'is_published' => true,
        //         'price' => 4.50,
        //         'genre' => 'African',
        //         'subgenre' => 'Genge',

        //         'songs' => [
        //             [
        //                 'title' => 'City Lights',
        //                 'duration' => '3:30',
        //                 'track_number' => 1,
        //                 'price' => 1,
        //                 'genre' => 'African',
        //                 'subgenre' => 'Genge',
        //                 'user_id' => 1,
        //                 'file_url' => 'https://hola.com/165165156'


        //             ],
        //             [
        //                 'title' => 'Metro Life',
        //                 'duration' => '4:15',
        //                 'track_number' => 2,
        //                 'price' => 1,
        //                 'genre' => 'African',
        //                 'subgenre' => 'Genge',
        //                 'user_id' => 1,
        //                 'file_url' => 'https://hola.com/165165156'


        //             ],
        //             [
        //                 'title' => 'Night Drive',
        //                 'duration' => '3:45',
        //                 'track_number' => 3,
        //                 'price' => 1,
        //                 'genre' => 'African',
        //                 'subgenre' => 'Genge',
        //                 'user_id' => 1,
        //                 'file_url' => 'https://hola.com/165165156'


        //             ],
        //         ]
        //     ],
        //     [
        //         'user_id' => 1,
        //         'title' => 'Nature\'s Symphony',
        //         'description' => 'Una fusión de sonidos naturales y música instrumental',
        //         'is_published' => true,
        //         'price' => 5.50,
        //         'genre' => 'African',
        //         'subgenre' => 'Genge',
        //         'songs' => [
        //             [
        //                 'title' => 'Forest Morning',
        //                 'duration' => '4:20',
        //                 'track_number' => 1,
        //                 'price' => 1,
        //                 'genre' => 'African',
        //                 'subgenre' => 'Genge',
        //                 'user_id' => 1,
        //                 'file_url' => 'https://hola.com/165165156'


        //             ],
        //             [
        //                 'title' => 'Ocean Waves',
        //                 'duration' => '5:10',
        //                 'track_number' => 2,
        //                 'price' => 1,
        //                 'genre' => 'African',
        //                 'subgenre' => 'Genge',
        //                 'user_id' => 1,
        //                 'file_url' => 'https://hola.com/165165156'


        //             ],
        //             [
        //                 'title' => 'Mountain Echo',
        //                 'duration' => '4:45',
        //                 'track_number' => 3,
        //                 'price' => 1,
        //                 'genre' => 'African',
        //                 'subgenre' => 'Genge',
        //                 'user_id' => 1,
        //                 'file_url' => 'https://hola.com/165165156'


        //             ],
        //             [
        //                 'title' => 'River Flow',
        //                 'duration' => '3:55',
        //                 'track_number' => 4,
        //                 'price' => 1,
        //                 'genre' => 'African',
        //                 'subgenre' => 'Genge',
        //                 'user_id' => 1,
        //                 'file_url' => 'https://hola.com/165165156'


        //             ],
        //             [
        //                 'title' => 'Desert Wind',
        //                 'duration' => '4:30',
        //                 'track_number' => 5,
        //                 'price' => 1,
        //                 'genre' => 'African',
        //                 'subgenre' => 'Genge',
        //                 'user_id' => 1,
        //                 'file_url' => 'https://hola.com/165165156'


        //             ],
        //             [
        //                 'title' => 'Rain Dance',
        //                 'duration' => '4:15',
        //                 'track_number' => 6,
        //                 'price' => 1,
        //                 'genre' => 'African',
        //                 'subgenre' => 'Genge',
        //                 'user_id' => 1,
        //                 'file_url' => 'https://hola.com/165165156'


        //             ],
        //             [
        //                 'title' => 'Thunder Road',
        //                 'duration' => '5:00',
        //                 'track_number' => 7,
        //                 'price' => 1,
        //                 'genre' => 'African',
        //                 'subgenre' => 'Genge',
        //                 'user_id' => 1,
        //                 'file_url' => 'https://hola.com/165165156'


        //             ],
        //         ]
        //     ],
        //     [
        //         'user_id' => 2,
        //         'title' => 'Mystic Lands',
        //         'description' => 'Explora sonidos etéreos y paisajes sonoros místicos',
        //         'is_published' => true,
        //         'price' => 6.00,
        //         'genre' => 'Ambient',
        //         'subgenre' => 'Downtempo',
        //         'songs' => [
        //             [
        //                 'title' => 'Ethereal Winds',
        //                 'duration' => '4:40',
        //                 'track_number' => 1,
        //                 'price' => 1,
        //                 'genre' => 'Ambient',
        //                 'subgenre' => 'Downtempo',
        //                 'user_id' => 2,
        //                 'file_url' => 'https://example.com/track1'
        //             ],
        //             [
        //                 'title' => 'Silent Moon',
        //                 'duration' => '5:05',
        //                 'track_number' => 2,
        //                 'price' => 1,
        //                 'genre' => 'Ambient',
        //                 'subgenre' => 'Downtempo',
        //                 'user_id' => 2,
        //                 'file_url' => 'https://example.com/track2'
        //             ],
        //             [
        //                 'title' => 'Desert Mirage',
        //                 'duration' => '4:30',
        //                 'track_number' => 3,
        //                 'price' => 1,
        //                 'genre' => 'Ambient',
        //                 'subgenre' => 'Downtempo',
        //                 'user_id' => 2,
        //                 'file_url' => 'https://example.com/track3'
        //             ],
        //             [
        //                 'title' => 'Starlit Skies',
        //                 'duration' => '4:55',
        //                 'track_number' => 4,
        //                 'price' => 1,
        //                 'genre' => 'Ambient',
        //                 'subgenre' => 'Downtempo',
        //                 'user_id' => 2,
        //                 'file_url' => 'https://example.com/track4'
        //             ],
        //             [
        //                 'title' => 'Echoes of Time',
        //                 'duration' => '5:20',
        //                 'track_number' => 5,
        //                 'price' => 1,
        //                 'genre' => 'Ambient',
        //                 'subgenre' => 'Downtempo',
        //                 'user_id' => 2,
        //                 'file_url' => 'https://example.com/track5'
        //             ],
        //             [
        //                 'title' => 'Whispering Pines',
        //                 'duration' => '4:35',
        //                 'track_number' => 6,
        //                 'price' => 1,
        //                 'genre' => 'Ambient',
        //                 'subgenre' => 'Downtempo',
        //                 'user_id' => 2,
        //                 'file_url' => 'https://example.com/track6'
        //             ],
        //             [
        //                 'title' => 'Celestial Harmony',
        //                 'duration' => '5:10',
        //                 'track_number' => 7,
        //                 'price' => 1,
        //                 'genre' => 'Ambient',
        //                 'subgenre' => 'Downtempo',
        //                 'user_id' => 2,
        //                 'file_url' => 'https://example.com/track7'
        //             ],
        //         ]
        //     ],
        //     [
        //         'user_id' => 2,
        //         'title' => 'Digital Dreams',
        //         'description' => 'Sonidos futuristas y digitales que evocan un viaje virtual',
        //         'is_published' => true,
        //         'price' => 5.50,
        //         'genre' => 'Electronic',
        //         'subgenre' => 'Synthwave',
        //         'songs' => [
        //             [
        //                 'title' => 'Neon City',
        //                 'duration' => '4:10',
        //                 'track_number' => 1,
        //                 'price' => 1,
        //                 'genre' => 'Electronic',
        //                 'subgenre' => 'Synthwave',
        //                 'user_id' => 2,
        //                 'file_url' => 'https://example.com/track8'
        //             ],
        //             [
        //                 'title' => 'Cyber Night',
        //                 'duration' => '5:00',
        //                 'track_number' => 2,
        //                 'price' => 1,
        //                 'genre' => 'Electronic',
        //                 'subgenre' => 'Synthwave',
        //                 'user_id' => 2,
        //                 'file_url' => 'https://example.com/track9'
        //             ],
        //             [
        //                 'title' => 'Pixel Pulse',
        //                 'duration' => '4:25',
        //                 'track_number' => 3,
        //                 'price' => 1,
        //                 'genre' => 'Electronic',
        //                 'subgenre' => 'Synthwave',
        //                 'user_id' => 2,
        //                 'file_url' => 'https://example.com/track10'
        //             ],
        //             [
        //                 'title' => 'Virtual Reality',
        //                 'duration' => '4:55',
        //                 'track_number' => 4,
        //                 'price' => 1,
        //                 'genre' => 'Electronic',
        //                 'subgenre' => 'Synthwave',
        //                 'user_id' => 2,
        //                 'file_url' => 'https://example.com/track11'
        //             ],
        //         ]
        //     ],
        //     [
        //         'user_id' => 2,
        //         'title' => 'Nature’s Echo',
        //         'description' => 'Un álbum relajante inspirado en la naturaleza y sus sonidos',
        //         'is_published' => true,
        //         'price' => 6.00,
        //         'genre' => 'Ambient',
        //         'subgenre' => 'New Age',
        //         'songs' => [
        //             [
        //                 'title' => 'Morning Dew',
        //                 'duration' => '4:15',
        //                 'track_number' => 1,
        //                 'price' => 1,
        //                 'genre' => 'Ambient',
        //                 'subgenre' => 'New Age',
        //                 'user_id' => 2,
        //                 'file_url' => 'https://example.com/track12'
        //             ],
        //             [
        //                 'title' => 'Forest Whispers',
        //                 'duration' => '5:05',
        //                 'track_number' => 2,
        //                 'price' => 1,
        //                 'genre' => 'Ambient',
        //                 'subgenre' => 'New Age',
        //                 'user_id' => 2,
        //                 'file_url' => 'https://example.com/track13'
        //             ],
        //             [
        //                 'title' => 'Mountain Breeze',
        //                 'duration' => '4:50',
        //                 'track_number' => 3,
        //                 'price' => 1,
        //                 'genre' => 'Ambient',
        //                 'subgenre' => 'New Age',
        //                 'user_id' => 2,
        //                 'file_url' => 'https://example.com/track14'
        //             ],
        //         ]
        //     ],
        //     [
        //         'user_id' => 2,
        //         'title' => 'Stellar Odyssey',
        //         'description' => 'Explora el cosmos con sonidos inspirados en el universo',
        //         'is_published' => true,
        //         'price' => 7.00,
        //         'genre' => 'Ambient',
        //         'subgenre' => 'Space',
        //         'songs' => [
        //             [
        //                 'title' => 'Galactic Voyage',
        //                 'duration' => '5:20',
        //                 'track_number' => 1,
        //                 'price' => 1.5,
        //                 'genre' => 'Ambient',
        //                 'subgenre' => 'Space',
        //                 'user_id' => 2,
        //                 'file_url' => 'https://example.com/track15'
        //             ],
        //             [
        //                 'title' => 'Nebula Dreams',
        //                 'duration' => '6:00',
        //                 'track_number' => 2,
        //                 'price' => 1.5,
        //                 'genre' => 'Ambient',
        //                 'subgenre' => 'Space',
        //                 'user_id' => 2,
        //                 'file_url' => 'https://example.com/track16'
        //             ],
        //             [
        //                 'title' => 'Starry Horizons',
        //                 'duration' => '4:45',
        //                 'track_number' => 3,
        //                 'price' => 1.5,
        //                 'genre' => 'Ambient',
        //                 'subgenre' => 'Space',
        //                 'user_id' => 2,
        //                 'file_url' => 'https://example.com/track17'
        //             ],
        //         ]
        //     ]
        // ];

        // foreach ($albums as $albumData) {
        //     $songs = $albumData['songs'];
        //     unset($albumData['songs']);
        //     $title = trim($albumData['title']);
        //     // Crear el álbum
        //     $albumData['cover_image'] = "https://fakeimg.pl/600x400/f50808/909090?text=$title";
        //     $album = Album::create($albumData);

        //     // Crear las canciones asociadas al álbum
        //     foreach ($songs as $song) {
        //         $song['album_id'] = $album->id;
        //         $song['cover_image'] =
        //             Song::create($song);
        //     }
        // }


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
            $song = Song::inRandomOrder()->first();

            $user->purchases()->create([
                'purchaseable_id' => $song->id,
                'purchaseable_type' => Song::class,
                'amount' => $song->price,
                'status' => $faker->randomElement(['pending', 'completed', 'failed']),
                'payment_method' => $faker->randomElement(['paypal', 'crypto']),
                'transaction_id' => $faker->uuid(),
            ]);
        }

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
