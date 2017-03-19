<?php

namespace App\Http\Controllers;

use DB;
use Auth;
use App\JWT;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Http\Requests;

class AuthController extends ApiController
{
    public function authenticate(Request $request)
    {
        //Check Creds, Login user
        $credentialCheck = Auth::once(['email' => $request['email'], 'password' => $request['password']]);
    	if (!$credentialCheck) {
            return $this->respondBadRequest('Credentials are invalid');
        }

        $jwt = JWT::createJwt(Auth::id());
        
        return $this->respondOk(['success' => 'true', 'user_id' => Auth::id()])
        	->header('Authorization', $jwt);
    }

    public function signup(Request $request)
    {
        $this->validate($request, [
            'data.email' => 'required',
            'data.password' => 'required'
        ]);
        $credentials = $request->all()['data'];
    	$user = new User;
        $user->email = $credentials['email'];
        $user->password = bcrypt($credentials['password']);
        $user->save();

        $jwt = JWT::createJwt($user->id); 

        return $this->respondOk(['success' => 'true', 'user_id' => $user->id])
            ->header('Authorization', $jwt);
    }

    public function index(Request $request)
    {
        return $this->respondOk(Auth::user());
    }

    public function edit(Request $request)
    {
        $user = Auth::user();
    }
}
