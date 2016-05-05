Vue.component('restaurants', {
    template: '#restaurants-template',
    data: function() {
        return {
            restaurants: []
        };
    },
    created: function(){
        $.getJSON('api/restaurants', function(data) {
            this.restaurants = data;
        }.bind(this));
    },
    methods: {
        clickAte: function(restaurant) {
            $.ajax({
                method: 'POST',
                url: restaurantsRankUrl,
                data: {restaurant_id: restaurant.id, _token: token}
            }).done(function(msg){

                // $(restaurantNameElement).text(msg['new_name']);
                // $(restaurantAddressElement).text(msg['new_address']);
                // $('#edit-restaurant-modal').modal('hide');
            });
        }
    }

});


var vm = new Vue({
    el: '.container',
});
