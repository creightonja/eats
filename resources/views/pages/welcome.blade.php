@extends('layouts.app')

@section('title')
Eats Ranker
@endsection


@section('content')
    <div class="row">
        <div class="col-md-6">
            <h3>Sign Up</h3>
            <form class="POST" action="index.html" method="post">
                <div class="form-group">
                    <label for="email">E-mail</label>
                    <input class="form-control" type="text" name="email" id="email" value="">
                </div>
                <div class="form-group">
                    <label for="first_name">First Name:</label>
                    <input class="form-control" type="text" name="first_name" id="first_name" value="">
                </div>
                <div class="form-group">
                    <label for="last_name"></label>
                    <input class="form-control" type="text" name="last_name" id="last_name" value="">
                </div>
                <div class="form-group">
                    <label for="password"></label>
                    <input class="form-control" type="text" name="password" id="password" value="">
                </div>
                <button class="btn btn-primary" type="submit" name="button">Submit</button>
            </form>
        </div>
        <div class="col-md-6">
            <div class="col-6">
                <h3>Sign In</h3>
                <form class="POST" action="index.html" method="post">
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input class="form-control" type="text" name="email" id="email" value="">
                    </div>
                    <div class="form-group">
                        <label for="password"></label>
                        <input class="form-control" type="text" name="password" id="password" value="">
                    </div>
                    <button class="btn btn-primary" type="submit" name="button">Submit</button>
                </form>
            </div>
        </div>

    </div>


@endsection
