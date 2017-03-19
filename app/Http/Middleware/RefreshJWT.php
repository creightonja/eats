<?php

namespace app\Http\Middleware;

use Auth;
use Closure;
use Carbon\Carbon;
use \Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ReceiveJWT
{
	public function handle($request, Closure $next, $guard = null)
	{
		
	}
}