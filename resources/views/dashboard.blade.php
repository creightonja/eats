@extends('layouts.app')

@section('title')
User Dashboard
@endsection

@section('content')
@include('includes.messages')
<section class="row new-post">
    <div class="col-md-6 col-md-offset-3">
        <header><h3>What do you have to say</h3></header>
        <form class="" action="{{ route('restaurant.create') }}" method="post">
            <div class="form-group">
                <label for="name">Name: </label>
                <input type="text" name="name" id="name" value="{{ Request::old('name') }}" placeholder="Bob's Pizza">
            </div>
            <div class="form-group">
                <label for="address">Address: </label>
                <input type="text" name="address" id="address" value="{{ Request::old('address') }}" placeholder="123 Bob Lane">
            </div>
            <!-- <div class="form-group">
                <textarea class="form-control" name="description" rows="8" cols="40" placeholder="Restaurant Description"></textarea>
            </div> -->

            <button type="submit" class="btn btn-primary" name="button">Add Restaurant</button>
            <input type="hidden" name="_token" id="_token" value="{{ Session::token() }}">
        </form>
    </div>
</section>
<section class="row posts">
    <div class="col-md-6 col-md-offset-3">
        <header><h3>Restaurants</h3></header>
        @foreach($restaurants as $restaurant)
        <article class="post">
            <p>{{ $restaurant->name }}</p>
            <div class="info">
                Created by {{ $restaurant->user->first_name }} at {{ $restaurant->created_at }}
            </div>
            <div class="interaction">
                <a href="#">Like</a>
                <a href="#">Dislike</a>
                <a href="#">Edit</a>
                <a href="#">Delete</a>
            </div>
        </article>
        @endforeach
    </div>
</section>
@endsection
