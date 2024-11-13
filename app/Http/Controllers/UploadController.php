<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Song;
use getID3;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Google\Cloud\Storage\Bucket;


class UploadController extends Controller
{

    private function convertGsToHttp($path)
    {
        $bucket = "blockchain-music-138d8.appspot.com"; // Cambia esto si es necesario
        $encodedFilePath = urlencode($path); // Codifica el path, convirtiendo las barras en %2F
        return "https://firebasestorage.googleapis.com/v0/b/{$bucket}/o/{$encodedFilePath}?alt=media";
    }

    private function convertHttpToGs(string $httpUrl): string
    {
        $pattern = '/\/o\/(.+)\?alt=media/';
        if (preg_match($pattern, $httpUrl, $matches)) {
            return urldecode($matches[1]);
        }
        return '';
    }


    public function uploadForm()
    {
        return Inertia::render('Albums/UploadAlbum');
    }
    public function upload(Request $request, Bucket $firebaseStorage)
    {

        $userId = Auth::user()->getAuthIdentifier();


        $request->validate([
            'titles.*' => 'required|string|max:255',
            'files.*' => 'required|file|max:10240',
            'song_price.*' => 'nullable|numeric',
            'image' => 'required|file|max:5000',
            'album_title' => 'required|string|max:50',
            'description' => 'nullable|min:10|max:250',
            'price' => 'nullable|numeric'
        ]);

        // dd($request->all());

        $filePaths = [];
        $imageCover = $request->file('image');
        $description = $request->input('description');
        $albumPrice = $request->input('album_price');
        $albumTitle = $request->input('album_title');
        $genre = $request->input('genre');
        $subGenre = $request->input('subgenre');


        $fechaMySQL = now()->format('Y-m-d H:i:s');

        $imageCoverName = time() . '_' . $imageCover->getClientOriginalName();
        $imagePath = 'cover_images/' . $userId . '/' . $imageCoverName;
        $firebaseStorage->upload(fopen($imageCover->getPathname(), 'r'), [
            'name' => $imagePath
        ]);

        $newAlbum = Album::create(['user_id' => $userId, 'title' => $albumTitle, 'cover_image' => $this->convertGsToHttp($imagePath), 'description' => $description, 'price' => $albumPrice, 'release_date' => $fechaMySQL, 'genre' => $genre, 'subgenre' => $subGenre]);

        $albumID = $newAlbum->id;

        // ID3 METADATA
        // Initialize getID3 engine
        $getID3 = new getID3;
        // ITERATION OVER FILES AND SAVE
        foreach ($request->file('files') as $index => $file) {

            // INFO METADATA FILE
            $infoFile = $getID3->analyze($file->getPathname());

            $fileDuration = $infoFile['playtime_seconds'];

            // Convierte los segundos a horas, minutos y segundos
            $hours = floor($fileDuration / 3600);
            $minutes = floor(($fileDuration % 3600) / 60);
            $seconds = floor($fileDuration % 60); // Redondea a la baja para evitar decimales en segundos

            // Formatea en HH:MM:SS
            $formattedDuration = sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds);

            $title = $request->titles[$index];
            $songPrice = $request->song_price[$index];


            //Unique Name File
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = 'tracks/' . $userId . '/' . $fileName;

            // Subimos el archivo al bucket de Firebase
            $firebaseStorage->upload(fopen($file->getPathname(), 'r'), [
                'name' => $filePath
            ]);


            $newSong = Song::create([
                'album_id' => $albumID,
                'user_id' => $userId,
                'duration' => $formattedDuration,
                'title' => $title,
                'file_url' => $filePath,
                'track_number' => $index + 1,
                'price' => $songPrice,
                'genre' => $genre,
                'subgenre' => $subGenre
            ]);

            if ($newSong === null) {
                return redirect('/albums')->withErrors(['error' => 'No se pudo crear la cancion en la base de datos']);
            }

            $filePaths[] = [
                'title' => $request->titles[$index],
                'path' => $filePath,
                'album_title' => $albumTitle
            ];


            return to_route('albums.showAlbum', [
                'id' => $newAlbum->id,
                200
            ])->withInput($filePaths);
        }
    }
}
