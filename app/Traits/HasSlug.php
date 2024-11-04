<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait HasSlug {
    protected static function bootHasSlug(){
        static::creating(function ($model){
            if(!$model->slug) {
                $model->slug = Str::slug($model->title);
            }
        });
    }
}