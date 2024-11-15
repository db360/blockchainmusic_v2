<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Log;

class UserController extends Controller
{
    public function toggleLike(Album $album):RedirectResponse
    {
        try {
            $user = Auth::user();

            if ($user->hasLikedAlbum($album)) {
                $user->unfavorite($album);
                $message = 'Album removed from favorites.';
            } else {
                $user->favorite($album);
                $message = 'Album added to favorites.';
            }

            return redirect()->back()->with('success', $message);
        } catch (\Exception $e) {
            Log::error('Error toggling album favorite status:', [
                'album_id' => $album->id,
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);

            return redirect()->back()->with('error', 'Unable to update favorite status. Please try again.');
        }
    }
}
