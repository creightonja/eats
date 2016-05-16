Vue.component('restaurants', {
    template: '#restaurants-template',
    data: function() {
        return {
            restaurants: [],
        };
    },
    events: {
        'receive-restaurants': function(msg){
            this.restaurants = msg;
        },
    },
    methods: {
        createRank: function(restaurant) {
            $.post(restaurantsRankUrl, {restaurant_id: restaurant.id, _token: token})
                .done(function(msg){
                    restaurant.ranked = true;
            });
            this.dispatchRanks();
        },
        destroyRank: function(restaurant) {
            $.post(rankDestroyUrl, {restaurant_id: restaurant.id, _token: token})
                .done(function(msg){
                    restaurant.ranked = false;
                    restaurant.rank = 0;
            });
            this.dispatchRanks();
        },
        //Used for passing list of restaurants to parent
        dispatchRanks: function() {
            this.$dispatch('receive-list', this.restaurants);
        },
    },
});


Vue.component('ranks', {
    template: '#ranks-template',
    data: function(){
        return {
            restaurants: [],
        };
    },
    events: {
        'receive-restaurants': function(msg){
            this.restaurants = msg;
        },
    },
});


Vue.directive('sortable', {
    twoWay: true,
    deep: true,
    bind: function () {
        var that = this;

        var options = {
            draggable: Object.keys(this.modifiers)[0],
            ghostClass: "sortable-ghost",  // Class name for the drop placeholder
        };

        this.sortable = Sortable.create(this.el, options);

        this.sortable.option("onUpdate", function (e) {
            that.value.splice(e.newIndex, 0, that.value.splice(e.oldIndex, 1)[0]);

            that.value.forEach(function (restaurant, index) {
            	  //restaurant.rank = index + 1;
            });
        });

        this.onUpdate = function(value) {
            that.value = value;
        }
    },
    update: function (value) {
        this.onUpdate(value);
    }
});

var vm = new Vue({
    el: 'body',
    data: {
        restaurants: [],
    },
    events: {
        'receive-list': function(msg){
            this.restaurants = msg;
        },
    },
    created: function(){
        this.fetchRanks();
    },
    methods: {
        fetchRanks: function() {
            $.getJSON('api/rank/' + userId, function(data) {
                this.restaurants = data;
                this.broadcastRanks();
            }.bind(this));
        },
        broadcastRanks: function() {
            this.$broadcast('receive-restaurants', this.restaurants);
        },
    },
});


//<ul class="list-group"><h3>Restaurants</h3><li class="list-group-item" restaurant-id="{{ restaurant.id }}" v-for="restaurant in restaurants" :restaurant="restaurant">{{ restaurant.name }}<button v-show="!restaurant.ranked" style="float:right;" @click="createRank(restaurant)">Rank it!</button><button v-show="restaurant.ranked" style="float:right;" @click="destroyRank(restaurant)">Remove it!</button></li></ul>
