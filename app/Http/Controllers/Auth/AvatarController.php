<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Google\Cloud\Storage\Bucket;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class AvatarController extends Controller
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


    public function getAvatar($userId)
    {

        $avatar = User::select('profile_picture')->where('id', $userId)->first();

        return $avatar['profile_picture'];
    }

    public function update(Request $request, Bucket $firebaseStorage): RedirectResponse
    {
        //VALIDATION
        $request->validate([
            'avatar' => 'required|image|max:2048'
        ]);

        // RETRIEVE USER AND AVATAR FILE FROM REQUEST
        $user = $request->user();
        $image = $request->file('avatar');

        // CHECK IMAGE
        if (!$image) {
            return back()->withErrors(['avatar' => 'Hubo un problema al cargar la imagen.']);
        }

        // DELETE OLD AVATAR IF EXIST
        if ($user->profile_picture) {
            $previousImagePath = $this->convertHttpToGs($user->profile_picture); // CONVERT TO GS: URL
            $firebaseStorage->object($previousImagePath)->delete(); // FIREBASE DELETE
            User::where('id', $user->id)->update([
                'profile_picture' => null
            ]);
        }

        // IMAGE NAME AND PATH
        $imageName = time() . '_' . $image->getClientOriginalName();
        $imagePath = 'avatars/' . $user->id . '/' . $imageName;

        // UPLOAD TO FIREBASE STORAGE
        $upload = $firebaseStorage->upload(fopen($image->getPathname(), 'r'), [
            'name' => $imagePath,
        ]);


        if ($upload->exists()) {
            User::find($user->id)->update([
                'profile_picture' => $this->convertGsToHttp($imagePath)
            ]);
        } else {
            return back()->with(['errors' => 'Hubo un problema al subir el avatar']);
        }

        return back()->with(['success' => 'El avatar ha sido editado']);
    }
}
