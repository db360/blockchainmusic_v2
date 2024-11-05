<?php

namespace Database\Seeders;

use App\Models\Album;
use App\Models\Song;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AlbumsSongsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Datos de los álbumes
        $albums = [
            [
                'user_id' => 1,
                'title' => 'Midnight Dreams',
                'description' => 'Un viaje nocturno a través de melodías oníricas',
                'genre' => 'African',
                'subgenre' => 'Genge',
                'is_published' => true,
                'price' => 3.50,
                'songs' => [
                    [
                        'title' => 'Luna Plateada',
                        'duration' => '3:45',
                        'track_number' => 1,
                        'price' => 1,
                        'genre' => 'African',
                        'user_id' => 1,
                        'subgenre' => 'Genge',
                        'file_url' => 'https://hola.com/165165156'
                    ],
                    [
                        'title' => 'Sueños de Medianoche',
                        'duration' => '4:12',
                        'track_number' => 2,
                        'price' => 1,
                        'genre' => 'African',
                        'subgenre' => 'Genge',
                        'user_id' => 1,
                        'file_url' => 'https://hola.com/165165156'


                    ],
                    [
                        'title' => 'Estrellas Danzantes',
                        'duration' => '3:58',
                        'track_number' => 3,
                        'price' => 1,
                        'genre' => 'African',
                        'subgenre' => 'Genge',
                        'user_id' => 1,
                        'file_url' => 'https://hola.com/165165156'


                    ],
                    [
                        'title' => 'Susurros del Viento',
                        'duration' => '4:30',
                        'track_number' => 4,
                        'price' => 1,
                        'genre' => 'African',
                        'subgenre' => 'Genge',
                        'user_id' => 1,
                        'file_url' => 'https://hola.com/165165156'


                    ],
                    [
                        'title' => 'Amanecer',
                        'duration' => '5:15',
                        'track_number' => 5,
                        'price' => 1,
                        'genre' => 'African',
                        'subgenre' => 'Genge',
                        'user_id' => 1,
                        'file_url' => 'https://hola.com/165165156'


                    ],
                ]
            ],
            [
                'user_id' => 1,
                'title' => 'Urban Beats',
                'description' => 'Ritmos urbanos con toques electrónicos',
                'is_published' => true,
                'price' => 4.50,
                'genre' => 'African',
                'subgenre' => 'Genge',

                'songs' => [
                    [
                        'title' => 'City Lights',
                        'duration' => '3:30',
                        'track_number' => 1,
                        'price' => 1,
                        'genre' => 'African',
                        'subgenre' => 'Genge',
                        'user_id' => 1,
                        'file_url' => 'https://hola.com/165165156'


                    ],
                    [
                        'title' => 'Metro Life',
                        'duration' => '4:15',
                        'track_number' => 2,
                        'price' => 1,
                        'genre' => 'African',
                        'subgenre' => 'Genge',
                        'user_id' => 1,
                        'file_url' => 'https://hola.com/165165156'


                    ],
                    [
                        'title' => 'Night Drive',
                        'duration' => '3:45',
                        'track_number' => 3,
                        'price' => 1,
                        'genre' => 'African',
                        'subgenre' => 'Genge',
                        'user_id' => 1,
                        'file_url' => 'https://hola.com/165165156'


                    ],
                ]
            ],
            [
                'user_id' => 1,
                'title' => 'Nature\'s Symphony',
                'description' => 'Una fusión de sonidos naturales y música instrumental',
                'is_published' => true,
                'price' => 5.50,
                'genre' => 'African',
                'subgenre' => 'Genge',
                'songs' => [
                    [
                        'title' => 'Forest Morning',
                        'duration' => '4:20',
                        'track_number' => 1,
                        'price' => 1,
                        'genre' => 'African',
                        'subgenre' => 'Genge',
                        'user_id' => 1,
                        'file_url' => 'https://hola.com/165165156'


                    ],
                    [
                        'title' => 'Ocean Waves',
                        'duration' => '5:10',
                        'track_number' => 2,
                        'price' => 1,
                        'genre' => 'African',
                        'subgenre' => 'Genge',
                        'user_id' => 1,
                        'file_url' => 'https://hola.com/165165156'


                    ],
                    [
                        'title' => 'Mountain Echo',
                        'duration' => '4:45',
                        'track_number' => 3,
                        'price' => 1,
                        'genre' => 'African',
                        'subgenre' => 'Genge',
                        'user_id' => 1,
                        'file_url' => 'https://hola.com/165165156'


                    ],
                    [
                        'title' => 'River Flow',
                        'duration' => '3:55',
                        'track_number' => 4,
                        'price' => 1,
                        'genre' => 'African',
                        'subgenre' => 'Genge',
                        'user_id' => 1,
                        'file_url' => 'https://hola.com/165165156'


                    ],
                    [
                        'title' => 'Desert Wind',
                        'duration' => '4:30',
                        'track_number' => 5,
                        'price' => 1,
                        'genre' => 'African',
                        'subgenre' => 'Genge',
                        'user_id' => 1,
                        'file_url' => 'https://hola.com/165165156'


                    ],
                    [
                        'title' => 'Rain Dance',
                        'duration' => '4:15',
                        'track_number' => 6,
                        'price' => 1,
                        'genre' => 'African',
                        'subgenre' => 'Genge',
                        'user_id' => 1,
                        'file_url' => 'https://hola.com/165165156'


                    ],
                    [
                        'title' => 'Thunder Road',
                        'duration' => '5:00',
                        'track_number' => 7,
                        'price' => 1,
                        'genre' => 'African',
                        'subgenre' => 'Genge',
                        'user_id' => 1,
                        'file_url' => 'https://hola.com/165165156'


                    ],
                ]
            ]
        ];

        foreach ($albums as $albumData) {
            $songs = $albumData['songs'];
            unset($albumData['songs']);
            $title = trim($albumData['title']);
            // Crear el álbum
            $albumData['cover_image'] = "https://placehold.co/600x400?text=$title";
            $album = Album::create($albumData);

            // Crear las canciones asociadas al álbum
            foreach ($songs as $song) {
                $song['album_id'] = $album->id;
                $song['cover_image'] =
                Song::create($song);
            }
        }
    }
}
