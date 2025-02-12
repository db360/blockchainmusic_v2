<?php

use App\Http\Controllers\AlbumController;
use App\Http\Controllers\Auth\AccountTypeController;
use App\Http\Controllers\Auth\AvatarController;
use App\Http\Controllers\Auth\BioController;
use App\Http\Controllers\Auth\SocialLoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PurchasesController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CheckArtistRole;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    // PROFILE ROUTE
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // AVATAR ROUTE
    Route::post('/avatar', [AvatarController::class, 'update'])->name('avatar.update');
    Route::get('/avatar-get', [AvatarController::class, 'getAvatar'])->name('avatar.get');

    // BIOGRAPHY
    Route::post('/bio', [BioController::class, 'update'])->name('bio.update');

    // DASHBOARD ROUTES
    Route::get('/explore', [AlbumController::class, 'index'])->name('explore.index');

    // LIBRARY
    Route::get('/library', [AlbumController::class, 'userLibrary'])->name('user.library');
    Route::get('/history', [PurchasesController::class, 'artistSales'])->name('sales.artist');
    //PURCHASES
    Route::get('/purchases', [PurchasesController::class, 'userPurchases'])->name('purchases.user');
    Route::get('/purchases/{id}', [PurchasesController::class, 'purchaseDetail'])->name('purchases.detail');
    // UPLOAD ROUTE
    Route::get('/upload', [UploadController::class, 'uploadForm'])->name('albums.uploadForm');
    Route::post('/upload', [UploadController::class, 'upload'])->name('albums.upload')->middleware(CheckArtistRole::class);

    // SHOW ALBUM ROUTE
    Route::get('/album/{id}', [AlbumController::class, 'showAlbum'])->name('albums.showAlbum');

    // MARK AS FAVORITE
    Route::post('{type}/{id}/favorite', [UserController::class, 'toggleLike'])
    ->name('favorites.toggle')->where('type', 'album|song')
    ->name('favorites.toggle');


    // CART
    Route::get('/cart', [PurchasesController::class, 'showCart'])->name('purchases.cart');
    Route::post('/checkout', [PurchasesController::class, 'checkout'])->name('purchases.checkout');

});

// SOCIAL LOGINS ROUTES
Route::get('/socialite/{driver}', [SocialLoginController::class, 'toProvider'])->where('driver', 'github|google');
Route::get('/auth/{driver}/login', [SocialLoginController::class, 'handleCallback'])->where('driver', 'github|google');

// Register-Edit Controller
Route::get('/register-edit', [AccountTypeController::class, 'showForm'])->name('register-edit');
Route::post('/register-edit', [AccountTypeController::class, 'store']);


require __DIR__ . '/auth.php';
