<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
})->name('home');

Route::post('/signup', [
    'uses' => 'UserController@postSignUp',
    'as' => 'signup',
]);

Route::post('/signin', [
    'uses' => 'UserController@postSignIn',
    'as' => 'signin',
]);

Route::get('logout', [
    'uses' => 'UserController@getLogout',
    'as' => 'logout',
]);

Route::get('dashboard', [
    'uses' => 'RestaurantController@getDashboard',
    'as' => 'dashboard',
    'middleware' => 'auth',
]);

Route::post('/restaurant', [
    'uses' => 'RestaurantController@createRestaurant',
    'as' => 'restaurant.create',
    'middleware' => 'auth',
]);

Route::get('/restaurant/delete/{restaurant_id}', [
    'uses' => 'RestaurantController@getDeleteRestaurant',
    'as' => 'restaurant.delete',
    'middleware' => 'auth',
]);

// Route::group(['middleware' => ['web']], function() {
//
// });
