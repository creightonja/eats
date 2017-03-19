<?php

namespace app\Http\Middleware;

use Auth;
use Closure;
use Carbon\Carbon;
use Firebase\JWT\JWT;
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ReceiveJWT extends ApiController
{
	public function handle($request, Closure $next, $guard = null)
	{
		//Check for Authorization Header
		if (!$jwtHeader = $request->header('Authorization')) {
			return $this->respondBadRequest('Authorization header not sent');
		}
		
		$jwtString = explode(' ', $jwtHeader);
		if (!isset($jwtString[1])) {
			return $this->respondBadRequest('Authorization header must be formatted as follows. Bearer: {token}');
		}
		$jwt = $jwtString[1];
		
		$jwtRegex = '/^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/';
		if (!preg_match($jwtRegex, $jwt)) {
            return $this->respondBadReqeust('Improperly formatted JSON Web Token');
        }

        $decodedJwt = (array) JWT::decode($jwt, config('jwt.secret'), ['HS256']);

        $request['jwt'] = $decodedJwt;

        Auth::loginUsingId($decodedJwt['uid']);

		return $next($request);
	}
}