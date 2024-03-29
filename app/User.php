<?php

namespace App;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;


class User extends Model implements Authenticatable
{
    use \Illuminate\Auth\Authenticatable;

    public function restaurants()
    {
        return $this->hasMany('App\Restaurant');
    }

    public function rank_restaurants()
    {
        return $this->belongsToMany('App\Restaurant', 'user_rank_restaurant');
    }
}
