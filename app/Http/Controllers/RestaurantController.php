<?php

namespace App\Http\Controllers;

use App\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;


class RestaurantController extends Controller
{

    public function index()
    {
        $restaurants = Restaurant::orderBy('created_at', 'desc')->get();
        return view('pages.restaurants');
    }

    public function show()
    {
        $restaurants = Restaurant::orderBy('created_at', 'desc')->get();
        return $restaurants;
    }

    public function rank(Request $request)
    {
        //Validation

        $user = Auth::user();

        //Stopping duplicates from being added
        if (DB::select('select * from user_rank_restaurant where user_id = ' . $user->id . ' and restaurant_id = ' . $request['restaurant_id'])){
            return 'already added';
        }
        $restaurant = Restaurant::findOrFail($request['restaurant_id']);
        $rank = $restaurant->users()->attach($user->id);
        return $restaurant;
    }

    public function getRanks($user_id)
    {
        $user_ranks = DB::select('select * from user_rank_restaurant where user_id = ' . $user_id);
        return $user_ranks;
    }

    public function destroyRank(Request $request)
    {
        $user = Auth::user();
        DB::select('delete from user_rank_restaurant
                    where user_id = ' . $user->id .
                    ' and restaurant_id = ' . $request['restaurant_id']);
        return 'rank removed';
    }

    public function getDashboard()
    {
        $restaurants = Restaurant::orderBy('created_at', 'desc')->get();
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

    public function getDeleteRestaurant($restaurant_id)
    {
        //Method for inserting a different search parameter
        //$restauant = Restaurant::where('id', '>', $post_id)->first();
        $restaurant = Restaurant::where('id', $restaurant_id)->first();
        if (Auth::user() != $restaurant->user) {
            return redirect()->back();
        }
        $restaurant->delete();

        return redirect()->route('dashboard')->with(['message' => 'Successfully deleted']);
    }

    public function postEditRestaurant(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'address' => 'required'
        ]);
        $restaurant = Restaurant::find($request['id']);
        if (Auth::user() != $restaurant->user) {
            return redirect()->back();
        }
        $restaurant->name = $request['name'];
        $restaurant->address = $request['address'];
        $restaurant->update();
        return response()->json(['new_name' => $restaurant->name, 'new_address' => $restaurant->address], 200);
    }
}
