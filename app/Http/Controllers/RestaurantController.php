<?php

namespace App\Http\Controllers;

use App\Restaurant;
use Illuminate\Http\Request;


class RestaurantController extends Controller
{
    public function getDashboard()
    {
        $restaurants = Restaurant::all();
        return view('dashboard', ['restaurants' => $restaurants]);
    }


    public function createRestaurant(Request $request)
    {
        //Validation
        $this->validate($request, [
            'name' => 'required|min:3|max:100',
            'address' => 'required|min:3|max:100',
        ]);

        $restaurant = new Restaurant();
        $restaurant->name = $request['name'];
        $restaurant->address = $request['address'];

        //Ensure that a user is passed in through the request
        $message = 'There was an error!';
        if ($request->user()->restaurants()->save($restaurant)){
            $message = 'Post successfully completed';
        }

        return redirect()->route('dashboard')->with(['message' => $message]);
    }

    public function getDeletePost($restaurant_id)
    {
        //Method for inserting a different search parameter
        //$restauant = Restaurant::where('id', '>', $post_id)->first();
        $restauant = Restaurant::where('id', $post_id)->first();
        return
    }
}
