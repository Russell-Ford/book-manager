<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

// put all your REST routes inside api-group
Route::group(['prefix' => 'api'], function() {
    Route::put('transactions/return/{id}', 'TransactionController@returnBook');
    Route::get('transactions/last', 'TransactionController@lastPageIndex');
    Route::get('transactions/pending', 'TransactionController@pending');
    Route::get('accounts/last', 'AccountController@lastPageIndex');
    Route::get('books/last', 'BookController@lastPageIndex');
    Route::resource('books', 'BookController');
    Route::resource('transactions', 'TransactionController');
    Route::resource('accounts', 'AccountController');
});

Auth::routes();

// this route is for Angular and it should be placed after all other back end routes
// just keep it at the bottom
Route::get('/{any}', function ($any) {
    return view('welcome');
})->where('any', '.*');
