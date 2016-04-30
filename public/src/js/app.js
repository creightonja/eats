$('.edit-restaurant').on('click', function(event){
    event.preventDefault();
    var restaurantName = $(this).parents('.post').find('.restaurant-name').text();
    var restaurantAddress = $(this).parents('.post').find('.restaurant-address').text();
    $('#restaurant-name').val(restaurantName);
    $('#restaurant-address').val(restaurantAddress);
    $('#edit-restaurant-modal').modal();
});
