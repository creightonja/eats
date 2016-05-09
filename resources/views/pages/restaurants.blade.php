@extends('layouts.app')

@section('title')
Restaurants
@endsection

@include('includes.messages')

@section('content')
<div class="row">
    <div class="col-md-3">
        <restaurants></restaurants>
    </div>
    <div class="col-md-9">

    </div>
</div>

<template id="restaurants-template">
    <ul class="list-group">
        <h3>Restaurants</h3>
            <li class="list-group-item" v-for="restaurant in restaurants.restaurants">
                  @{{ restaurant.name }}
                  <button v-show="!restaurant.ranked" style="float:right;" @click="createRank(restaurant)">Rank it!</button>
                  <button v-show="restaurant.ranked" style="float:right;" @click="destroyRank(restaurant)">Remove it!</button>
            </li>
    </ul>
</template>

<script>
    var token = '{{ Session::token() }}';
    var restaurantsRankUrl = '{{ route('api.rank') }}';
    var rankDestroyUrl = '{{ route('api.ranks.destroy') }}';
    var userId = '{{ Auth::user()->id }}';
</script>
@endsection
