<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UploadController extends Controller
{
    public function upload()
{
    return Inertia::render('Albums/UploadAlbum');
}
}
