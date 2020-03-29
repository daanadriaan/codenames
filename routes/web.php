<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['as' => 'invite.'], function (){
    Route::post('get-or-create-players', 'InviteController@getOrCreatePlayers')->name('players.getOrCreate');
    Route::post('start', 'InviteController@start')->name('start');
    Route::post('stop', 'InviteController@stop')->name('stop');
    Route::post('get-chats', 'InviteController@chats')->name('chats');
    Route::post('get-tables', 'InviteController@tables')->name('tables');
    Route::get('uitnodiging/{uuid}', 'InviteController@accept')->name('accept');
    Route::post('aansluiten/{uuid}', 'InviteController@join')->name('join');
});

Route::group(['as' => 'move.', 'middleware' => 'checkGame'], function (){
    Route::post('zet', 'InviteController@move')->name('go');
    Route::post('draai/{card}', 'InviteController@turn')->name('turn');
});

Route::group(['as' => 'dashboard.'], function (){
    Route::get('/{any?}', function (){
        return view('app');
    })
        ->where('any', '!=', 'js|img|css|storage|vendor')
        ->where('any', '^(?!nova).*$');
});
