<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;


class BioController extends Controller
{
    public function update(Request $request) {

        $user = $request->user();

        $request->validate([
            'bio' => 'required|string|min:25'
        ]);

        $bio = $request->input('bio');

        User::find($user->id)->update([
            'bio' => $bio
        ]);

        return back()->with(['success' => 'La biografía ha sido editada correctamente']);
    }
}
