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
            <p class="restaurant-name">{{ $restaurant->name }}</p>
            <p class="restaurant-address">{{ $restaurant->address }}</p>
            <div class="info">
                Created by {{ $restaurant->user->first_name }} at {{ $restaurant->created_at }}
            </div>
            <div class="interaction">
                <a href="#">Like</a>
                | <a href="">Dislike</a>
                @if(Auth::user() == $restaurant->user)
                | <a href="#" class="edit-restaurant">Edit</a>
                | <a href="{{ route('restaurant.delete', ['restaurant_id' => $restaurant->id]) }}">Delete</a>
                @endif()

            </div>
        </article>
        @endforeach
    </div>
</section>

<div class="modal fade" tabindex="-1" role="dialog" id="edit-restaurant-modal">
  <div class="modal-dialog">
    <div class="modal-content">
        <form class="" action="" method="post">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Edit Restaurant</h4>
          </div>
          <div class="modal-body">
              <div class="form-group">
                  <label for="name">Name: </label>
                  <input type="text" name="name" id="restaurant-name" value="" placeholder="Bob's Pizza">
              </div>
              <div class="form-group">
                  <label for="address">Address: </label>
                  <input type="text" name="address" id="restaurant-address" value="" placeholder="123 Bob Lane">
              </div>
              <input type="hidden" name="_token" id="_token" value="{{ Session::token() }}">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
      </form>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
@endsection
