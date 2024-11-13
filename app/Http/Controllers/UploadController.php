<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UploadController extends Controller
{


    public function uploadForm()
    {
        return Inertia::render('Albums/UploadAlbum');
    }
    public function upload(Request $request)
    {

        $userId = Auth::user()->getAuthIdentifier();


        $request->validate([
            'titles.*' => 'required|string|max:255',
            'files.*' => 'required|file|max:10240',
            'image' => 'required|file|max:5000',
            'album_title' => 'required|string|max:50',
            'description' => 'nullable|min:10|max:250',
            'price' => 'nullable|numeric'
        ]);

        dd($request->all());


        return Inertia::render('');
    }
}
