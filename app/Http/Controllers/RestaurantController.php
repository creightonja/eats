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
        $restaurants = Restaurant::with(['dishes' => function($query) {
            $query->orderBy('global_rank');
        }])->get();
        return $restaurants;
    }



    //Rank methods, todo: move to rank controller
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
        $restaurants = Restaurant::get();
        //Retrieving list of restaurants ranked by the user
        $user_ranks = DB::select('SELECT user_rank_restaurant.*
            FROM user_rank_restaurant
            LEFT JOIN restaurants
            ON user_rank_restaurant.restaurant_id=restaurants.id
            WHERE user_rank_restaurant.user_id=' . $user_id);
        //Building array for already ranked restaurants
        $ranked_array = [];
        $rank_array = [];
        foreach($user_ranks as $rank){
            array_push($ranked_array, $rank->restaurant_id);
            array_push($rank_array, $rank->rank);
        }
        //Marking which restaurants have been ranked and their rank number
        foreach($restaurants as $restaurant){
            $array_key = array_search($restaurant->id, $ranked_array);
            if (($array_key !== false)){
                $restaurant->ranked = true;
                $restaurant->rank = $rank_array[$array_key];
            } else {
                $restaurant->ranked = false;
                $restaurant->rank = null;
            }
        }
        return $restaurants;
    }

    public function destroyRank(Request $request)
    {
        $user = Auth::user();
        DB::select('DELETE FROM user_rank_restaurant
                    WHERE user_id = ' . $user->id .
                    ' AND restaurant_id = ' . $request['restaurant_id']);
        return 'rank removed';
    }




    public function getDashboard()
    {
        $restaurants = Restaurant::orderBy('created_at', 'desc')->get();
        return view('dashboard', ['restaurants' => $restaurants]);
    }


    public function create(Request $request)
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

    public function delete($restaurant_id)
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

    public function edit(Request $request)
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
