<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlbumController extends Controller
{
    public function index() {
        $albums = Album::with('user')
            ->where('is_published', true)
            ->latest()
            ->paginate(12);

        return Inertia::render('Albums/Index', [
            'albums' => $albums
        ]);

    }
}
