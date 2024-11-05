<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait GenreScopes {
    public function scopeByGenre(Builder $query, string $genre){
        return $query->where('genre', $genre);
    }

    public function scopeBySubgenre(Builder $query, string $subgenre) {
        return $query->where('subgenre', $subgenre);
    }
}