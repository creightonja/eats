<?php

namespace App;

use Carbon\Carbon;
use Firebase\JWT\JWT as FirebaseJWT;
use Illuminate\Database\Eloquent\Model;

class JWT extends Model
{
    
    public static function createJwt($userID) {

    	$timestamp = Carbon::now()->timestamp;
        $token = [
            'iss' => 'eatsranker.com', //The issuer of the JWT
            'aud' => 'eatsranker.com', //The audience for the JWT
            'iat' => $timestamp, //Issued at, just the timestamp
            'nbf' => $timestamp, //Not before, time when the JWT becomes valid
            'exp' => Carbon::now()->addMinutes(1440)->timestamp, //Expiration, time when the JWT expires
            'uid' => $userID, //User ID, custom claim
        ];

        $jwt = FirebaseJWT::encode($token, config('jwt.secret'));

        return $jwt;
    }

}
