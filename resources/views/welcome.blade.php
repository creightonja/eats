@extends('layouts.app')

@section('title')
Eats Ranker
@endsection


@section('content')
    @if(count($errors) > 0)
        <div class="row">
            <div class="col-md-6">
                <ul>
                    @foreach($errors->all() as $error)
                        <li>{{$error}}</li>
                    @endforeach
                </ul>
            </div>
        </div>
    @endif
    <div class="row">
        <div class="col-md-6">
            <h3>Sign Up</h3>
            <form class="POST" action="{{ route('signup') }}" method="post">
                <div class="form-group{{$errors->has('email') ? ' has-error':''}}">
                    <label for="email">E-mail:</label>
                    <input class="form-control" type="text" name="email" id="email" value="{{ Request::old('email') }}">
                </div>
                <div class="form-group{{$errors->has('first_name') ? ' has-error':''}}">
                    <label for="first_name">First Name:</label>
                    <input class="form-control" type="text" name="first_name" id="first_name" value="{{ Request::old('first_name') }}">
                </div>
                <div class="form-group{{$errors->has('last_name') ? ' has-error':''}}">
                    <label for="last_name">Last Name:</label>
                    <input class="form-control" type="text" name="last_name" id="last_name" value="{{ Request::old('last_name') }}">
                </div>
                <div class="form-group{{$errors->has('password') ? ' has-error':''}}">
                    <label for="password">Password:</label>
                    <input class="form-control" type="password" name="password" id="password" value="">
                </div>
                <button class="btn btn-primary" type="submit" name="button">Submit</button>
                <input type="hidden" name="_token" value="{{ Session::token() }}">
            </form>
        </div>
        <div class="col-md-6">
            <div class="col-6">
                <h3>Sign In</h3>
                <form class="POST" action="{{ @route('signin') }}" method="post">
                    <div class="form-group{{$errors->has('email') ? ' has-error':''}}">
                        <label for="email">E-mail</label>
                        <input class="form-control" type="text" name="email" id="email" value="{{ Request::old('email') }}">
                    </div>
                    <div class="form-group{{$errors->has('password') ? ' has-error':''}}">
                        <label for="password"></label>
                        <input class="form-control" type="password" name="password" id="password" value="">
                    </div>
                    <button class="btn btn-primary" type="submit" name="button">Submit</button>
                    <input type="hidden" name="_token" value="{{ Session::token() }}">
                </form>
            </div>
        </div>

    </div>


@endsection
