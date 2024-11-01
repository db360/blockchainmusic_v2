<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Google\Cloud\Storage\Bucket;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AvatarController extends Controller
{

    private function convertGsToHttp($path)
    {
        $bucket = "blockchain-music-138d8.appspot.com"; // Cambia esto si es necesario
        $encodedFilePath = urlencode($path); // Codifica el path, convirtiendo las barras en %2F
        return "https://firebasestorage.googleapis.com/v0/b/{$bucket}/o/{$encodedFilePath}?alt=media";
    }
    public function update(Request $request, Bucket $firebaseStorage): RedirectResponse{

        //VALIDATION
        $request->validate([
            'avatar' => 'required|image|max:2048'
        ]);

        $user = Auth::user()->getAuthIdentifier();
        $image = $request->file('avatar');

        // CHECK IMAGE
        if (!$image) {
        return back()->withErrors(['avatar' => 'Hubo un problema al cargar la imagen.']);
        }

        // IMAGE NAME AND PATH
        $imageName = time() . '_' . $image->getClientOriginalName();
        $imagePath = 'avatars/' . $user . '/' . $imageName;

        // UPLOAD TO FIREBASE STORAGE
        $upload = $firebaseStorage->upload(fopen($image->getPathname(), 'r'), [
            'name' => $imagePath,
        ]);



        if($upload->exists()){
            User::find($user)->update([
                'profile_picture' => $this->convertGsToHttp($imagePath)
            ]);

        }


        return back();
    }
}
