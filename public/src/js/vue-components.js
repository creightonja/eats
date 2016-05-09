Vue.component('restaurants', {
    template: '#restaurants-template',
    data: function() {
        return {
            restaurants: [],
            //ranks: []
        };
    },
    created: function(){
        //this.fetchRestaurants();
        this.fetchRanks();
    },
    methods: {
        fetchRestaurants: function() {
            $.getJSON('api/restaurants', function(data) {
                this.restaurants = data;
            }.bind(this));
        },
        fetchRanks: function() {
            $.getJSON('api/rank/' + userId, function(data) {
                this.restaurants = data;
            }.bind(this));
        },
        createRank: function(restaurant) {
            $.post(restaurantsRankUrl, {restaurant_id: restaurant.id, _token: token})
                .done(function(msg){
                    restaurant.ranked = true;
            });
        },
        destroyRank: function(restaurant) {
            $.post(rankDestroyUrl, {restaurant_id: restaurant.id, _token: token})
                .done(function(msg){
                    restaurant.ranked = false;
            });
        },
    },
    // computed: {
    //     ranked: function() {
    //         if (this.restaurants.id =)
    //     },
    // }
});

Vue.directive('ajax', {

});

var vm = new Vue({
    el: 'body',
});


//<ul class="list-group"><h3>Restaurants</h3><li class="list-group-item" restaurant-id="{{ restaurant.id }}" v-for="restaurant in restaurants" :restaurant="restaurant">{{ restaurant.name }}<button v-show="!restaurant.ranked" style="float:right;" @click="createRank(restaurant)">Rank it!</button><button v-show="restaurant.ranked" style="float:right;" @click="destroyRank(restaurant)">Remove it!</button></li></ul>
