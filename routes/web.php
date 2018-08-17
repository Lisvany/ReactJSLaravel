<?php

Route::any('{all}', function(){
    return view('welcome');
})->where('all', '.*');

Route::any('{slug}', function($slug)
{
    return view('welcome');
})->where('slug', '([A-z\d-\/_.]+)?');
