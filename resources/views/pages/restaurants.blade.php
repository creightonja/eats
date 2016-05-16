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
        <ranks></ranks>
    </div>
</div>
<div class="row">
    @{{ restaurants | json }}
</div>

<template id="restaurants-template">
    <ul class="list-group">
        <h3>Restaurants</h3>
            <li class="list-group-item" v-for="restaurant in restaurants">
                  @{{ restaurant.name }}
                  <button v-show="!restaurant.ranked" style="float:right;" @click="createRank(restaurant)">Rank it!</button>
                  <button v-show="restaurant.ranked" style="float:right;" @click="destroyRank(restaurant)">Remove it!</button>
            </li>
    </ul>
</template>

<template id="ranks-template">
    <div class="col-md-6">
        <ul id="sort1" class="list-group sort-connector">
            <h3>Waiting to be Ranked</h3>
            <li class="list-group-item" v-for="restaurant in restaurants | orderBy 'rank'" v-if="restaurant.ranked && restaurant.rank == 0">
                <div class="name">
                    @{{ restaurant.name }}
                </div>
            </li>
        </ul>
    </div>
    <div class="col-md-6">
        <ul id="sort2" v-sortable.li="restaurants" class="list-group sort-connector">
            <h3>Current Rankings</h3>
            <li class="list-group-item" v-for="restaurant in restaurants" v-if="restaurant.ranked && restaurant.rank != 0">
                <div class="ranking rank-item">
                    @{{ restaurant.rank }}
                </div>
                <div class="name rank-item">
                    @{{ restaurant.name }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    var token = '{{ Session::token() }}';
    var restaurantsRankUrl = '{{ route('api.rank') }}';
    var rankDestroyUrl = '{{ route('api.ranks.destroy') }}';
    var userId = '{{ Auth::user()->id }}';
</script>
@endsection
