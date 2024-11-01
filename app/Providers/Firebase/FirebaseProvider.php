<?php

namespace App\Providers\Firebase;

use Google\Cloud\Storage\Bucket;
use Illuminate\Support\ServiceProvider;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Storage;

class FirebaseProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(Bucket::class, function($app) {
            $firebase = (new Factory)
                ->withServiceAccount(config('firebase.path'))
                ->withDefaultStorageBucket(config('firebase.storage_bucket'));

            return $firebase->createStorage()->getBucket();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
