<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Dish;
use App\Http\Requests;

class DishController extends Controller
{
    public function show()
    {
    	$dishes = Dish::with('restaurant')->get();
    	return $dishes;
    }
}
