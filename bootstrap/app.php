<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Inertia\Inertia;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        //
    })

    // HANDLING ERRORS TO THE ErrorsPage.tsx
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (Throwable $e) {
            // dd(vars: $e);
            // return Inertia::render('Errors/ErrorPage', ['errors' => [
            //     'message' => $e->getMessage(),
            //     'code' => $e->getCode(),
            //     'connectionName' => 'mysql',
            //     'errorInfo' => $e instanceof \PDOException ? $e->errorInfo : null,
            // ]]);
        });
    })->create();
