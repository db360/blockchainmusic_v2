<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Laravel\Socialite\Facades\Socialite;

class SocialLoginController extends Controller
{
    public function toProvider($driver):RedirectResponse {
        return Socialite::driver($driver)->redirect();
    }

    public function handleCallback($driver): RedirectResponse {
        $socialUser = Socialite::driver($driver)->user();

        $user = User::where('provider', $driver)
            ->where('provider_id', $socialUser->getId())
            ->orWhere('email', $socialUser->getEmail())
            ->first();

        if($user) {
            Auth::login($user);
            Session::regenerate();

            return redirect()->intended('dashboard');
        }

        session([
            'social_user' => [
                'name' => $socialUser->getName() ?? $socialUser->getNickname(),
                'email' => $socialUser->getEmail(),
                'provider' => $driver,
                'provider_id' => $socialUser->getId(),
                'avatar' => $socialUser->getAvatar(),
            ]
            ]);

        return redirect()->route('register-edit');
    }
}
