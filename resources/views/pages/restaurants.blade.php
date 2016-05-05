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
            <li class="list-group-item" restaurant-id="@{{ restaurant.id }}" v-for="restaurant in restaurants">
                  @{{ restaurant.name }}<button style="float:right;" @click="clickAte(restaurant)">Ate There</button>
            </li>
    </ul>
</template>

<script>
    var token = '{{ Session::token() }}';
    var restaurantsRankUrl = '{{ route('api.restaurants.rank') }}'
</script>
@endsection
