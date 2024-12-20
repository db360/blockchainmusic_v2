<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Song;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Log;

class UserController extends Controller
{
    public function toggleLike(string $type, int $id): RedirectResponse
    {
        try {
            $user = Auth::user();

            $modelClass = match ($type) {
                'album' => Album::class,
                'song' => Song::class,
                default => throw new \Exception('Invalid model type')
            };

            $model = $modelClass::findOrFail($id);

            if ($user->{'hasLiked' . class_basename($modelClass)}($model)) {
                $user->unfavorite($model);
                $message = class_basename($modelClass) . ' removed from favorites.';
            } else {
                $user->favorite($model);
                $message = class_basename($modelClass) . ' added to favorites.';
            }

            return redirect()->back()->with('success', $message);
        } catch (\Exception $e) {
            Log::error('Error toggling favorite status:', [
                'model_id' => $id,
                'model_type' => $type,
                'user_id' => $user?->id,
                'error' => $e->getMessage()
            ]);
            return redirect()->back()->with('error', 'Unable to update favorite status. Please try again.');
        }
    }
}
