<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
            'book_id',
            'account_id',
            'date_issued',
            'date_returned'
    ];
}
