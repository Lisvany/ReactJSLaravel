<?php

use Illuminate\Http\Request;

use App\Task;
use App\User;


Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function () {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

    Route::get('tasks', 'TaskController@index');
    Route::post('addtask', 'TaskController@store');
    Route::post('edittask/{id}', 'TaskController@update');
    Route::put('updatetask', 'TaskController@update');
    Route::get('task/{id}', 'TaskController@getById');
    Route::delete('task/{id}', 'TaskController@destroy');

});