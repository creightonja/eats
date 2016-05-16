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

Route::get('/react', function () {
    return view('pages.reactindex');
})->name('react');


Route::get('restaurants', 'RestaurantController@index')->name('restaurants');
Route::get('api/restaurants', 'RestaurantController@show')->name('api.restaurants');
Route::post('api/rank', 'RestaurantController@rank')->name('api.rank');
Route::get('api/rank/{user_id}', 'RestaurantController@getRanks')->name('api.ranks.show');
Route::post('api/rank/destroy', 'RestaurantController@destroyRank')->name('api.ranks.destroy');


//////////////////////////////////////User Routes//////////////////////////////
Route::post('signup', 'UserController@postSignUp')->name('signup');
Route::post('signin', 'UserController@postSignIn')->name('signin');
Route::get('logout', 'UserController@getLogout')->name('logout');
Route::get('account', [
    'uses' => 'UserController@getAccount',
    'as' => 'account',
    'middleware' => 'auth',
]);
Route::post('account/edit', 'UserController@postUpdateAccount')->name('account.save');
Route::get('userimage/{filename}', 'UserController@getUserImage')->name('account.image');
Route::post('user/{id}/image', 'UserController@addImage')->name('user.add.image');


//////////////////////////////////////Restaurant Routes//////////////////////////////
Route::get('dashboard', [
    'uses' => 'RestaurantController@getDashboard',
    'as' => 'dashboard',
    'middleware' => 'auth',
]);
Route::post('restaurant', [
    'uses' => 'RestaurantController@create',
    'as' => 'restaurant.create',
    'middleware' => 'auth',
]);
Route::get('restaurant/delete/{restaurant_id}', [
    'uses' => 'RestaurantController@delete',
    'as' => 'restaurant.delete',
    'middleware' => 'auth',
]);
Route::post('restaurant/edit', 'RestaurantController@edit')->name('restaurant.edit');


/////////////////////////////////////Rank Restaurant Routes /////////////////////////

Route::get('restaurants/rank', 'RestaurantRankController@index')->name('restaurants.rank');
