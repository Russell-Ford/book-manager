<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
            'title',
            'author',
            'isbn',
            'category',
            'total',
            'issued',
            'publish_date'
    ];
}
