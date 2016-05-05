var restaurantId;
var restaurantNameElement;
var restaurantAddressElement;

$('.edit-restaurant').on('click', function(event){
    event.preventDefault();
    restaurantNameElement = $(this).parents('.post').find('.restaurant-name');
    restaurantAddressElement = $(this).parents('.post').find('.restaurant-address');
    restaurantId = $(this).parents('.post').attr('data-restaurantId');

    var restaurantName = restaurantNameElement.text();
    var restaurantAddress = restaurantAddressElement.text();

    $('#restaurant-name').val(restaurantName);
    $('#restaurant-address').val(restaurantAddress);
    $('#edit-restaurant-modal').modal();
});

$('#modal-save').on('click', function(){
    $.ajax({
        method: 'POST',
        url: restaurantEditUrl,
        data: {name: $('#restaurant-name').val(), address: $('#restaurant-address').val(), id: restaurantId, _token: token}
    }).done(function(msg){
        $(restaurantNameElement).text(msg['new_name']);
        $(restaurantAddressElement).text(msg['new_address']);
        $('#edit-restaurant-modal').modal('hide');
    });
});





// "myAwesomeDropzone" is the camelized version of the HTML element's ID
Dropzone.options.dropzone = {
  //paramName: "file", // The name that will be used to transfer the file
  maxFiles: 1,
};
