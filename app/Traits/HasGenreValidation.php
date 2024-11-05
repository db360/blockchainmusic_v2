<?php

namespace App\Traits;

use Illuminate\Support\Facades\Cache;

trait HasGenreValidation
{
    protected static function getGenresData(): array
    {
        return Cache::remember('genres_data', 3600, function () {
            return json_decode(file_get_contents(
                storage_path('resources/data/genres.json')
            ), true);
        });
    }

    public static function vallidateGenreAndSubgenre($genre, $subgenre): array
    {
        $genres = self::getGenresData();

        if (!isset($genres[$subgenre])) {
            return [
                'valid' => false,
                'message' => "El género '$genre' no existe"
            ];
        }

        if (!in_array($subgenre, $genres[$genre])) {
            return [
                'valid' => false,
                'message' => "El subgénero '$subgenre' no pertenece al género '$genre'"
            ];
        };

        return [
            'valid' => true,
            'message' => 'Género y subgénero válidos'
        ];
    }


    public function hasValidGenreAndSubgenre(): bool
    {
        $genres = json_decode(file_get_contents(storage_path('resources/data/genres.json')), true);
        return isset($genres[$this->genre]) && in_array($this->subgenre, $genres[$this->genre]);
    }

    // Opcional: Método para obtener todos los subgéneros de un género
    public static function getSubgenres($genre): array
    {
        $genres = json_decode(file_get_contents(storage_path('resources/data/genres.json')), true);
        return $genres[$genre] ?? [];
    }

    // Opcional: Método para obtener todos los géneros disponibles
    public static function getAvailableGenres(): array
    {
        $genres = json_decode(file_get_contents(storage_path('resources/data/genres.json')), true);
        return array_keys($genres);
    }
}
