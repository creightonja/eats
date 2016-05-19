<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Dish;
use App\Http\Requests;

class DishController extends ApiController
{

    public function index()
    {
    	$dishes = Dish::with('restaurant')->get();
    	return response()->json([
    		'data' => $this->transformCollection($dishes),
    	], 200);
    }

    public function show($id)
    {
    	$dish = Dish::find($id);
    	if(!$dish) 
    	{
    		return $this->respondNotFound('Dish does not exist');
    	}

    	return response()->json([
    		'data' => $this->transform($dish),
    	], 200);
    }

    public function getDishesWithRestaurants()
    {
        $dishes = Dish::with('restaurant')->get();
        return $dishes;
    }





    private function transformCollection($dishes)
    {
    	return array_map([$this, 'transform'], $dishes->toArray());
    }

    private function transform($dish)
    {
    	return [
    		'name' => $dish['name'],
    		'restaurant_id' => $dish['restaurant_id'],
    		'global_rank' => $dish['global_rank'],
    		'menu_rank' => $dish['menu_rank'],
    		'type' => $dish['type'],
    		'photo' => $dish['photo'],
    	];
    }
}
