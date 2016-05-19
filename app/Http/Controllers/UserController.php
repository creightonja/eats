<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{

    protected $hidden = ['password'];

    public function apiSignIn(Request $request)
    {
        $this->validate($request, [
            'email' => 'required',
            'password' => 'required'
        ]);
        Auth::guard('api')->user();
    }

    public function postSignUp(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email|unique:users',
            'first_name' => 'required|min:3|max:40',
            'last_name' => 'required|min:3|max:40',
            'password' => 'required|min:6|max:40'
        ]);
        $user = new User();
        $user->email = $request['email'];
        $user->first_name = $request['first_name'];
        $user->last_name = $request['last_name'];
        $user->password = bcrypt($request['password']);
        $user->save();
        Auth::login($user);



        return redirect()->route('dashboard');
    }

    public function postSignIn(Request $request)
    {
        $this->validate($request, [
            'email' => 'required',
            'password' => 'required'
        ]);
        if (Auth::attempt(['email' => $request['email'], 'password' => $request['password']])){
            return redirect()->route('dashboard');
        }
        return redirect()->back();
    }

    public function getLogout()
    {
        Auth::logout();
        return redirect()->route('home');
    }

    public function getAccount()
    {
        return view('account', ['user' => Auth::user()]);
    }

    public function postUpdateAccount(Request $request)
    {
        // $this->validate($request, [
        //     'email' => 'required|email|unique:users',
        //     'first_name' => 'required|min:3|max:40',
        //     'last_name' => 'required|min:3|max:40',
        // ]);
        $user = Auth::user();
        $user->email = $request['email'];
        $user->first_name = $request['first_name'];
        $user->last_name = $request['last_name'];
        $user->update();
        $file = $request->file('image');
        $filename = $user->first_name . '-' . $user->id . '.jpg';
        if ($file) {
            Storage::disk('local')->put($filename, File::get($file));
        }
        return redirect()->route('account');
    }

    public function addImage(Request $request)
    {
        $user = Auth::user();
        $file = $request->file('file');
        $name = $user->first_name . '-' . $user->id . '.jpg';
        //$name = time() . $file->getClientOriginalName();
        $file->move('images/account', $name);
        return 'done';
    }

    public function getUserImage($filename)
    {
        $file = Storage::url($filename);
        return new Response($file, 200);
    }
}
