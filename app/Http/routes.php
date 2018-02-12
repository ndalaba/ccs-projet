<?php

Route::group(['middleware' => 'auth'], function () {

    Route::get('/', function () {
      return redirect('projet');        
    });
    // Include route
    require_once('routes/projet.php');

    Route::controller('users', 'UserController');

});




Route::controllers([
    'auth' => 'Auth\AuthController',
    'password' => 'Auth\PasswordController',
]);
