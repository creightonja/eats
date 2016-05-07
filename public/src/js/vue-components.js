Vue.component('restaurants', {
    template: '#restaurants-template',
    data: function() {
        return {
            restaurants: [],
            ranks: []
        };
    },
    created: function(){
        this.fetchRestaurants();
        this.fetchRanks();
        this.findRanked();
    },
    methods: {
        fetchRestaurants: function() {
            $.getJSON('api/restaurants', function(data) {
                this.restaurants = data;
            }.bind(this));
            console.log(this.restaurants[2]);
        },
        fetchRanks: function() {
            $.getJSON('api/rank/' + userId, function(data) {
                this.ranks = data;
            }.bind(this));
            console.log(this.ranks);
        },
        findRanked: function() {
            //console.log(vm.restaurants[0].id);
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
