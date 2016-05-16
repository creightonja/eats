import dispatcher from "../dispatcher";

export function createRestaurant(restaurant) {
	dispatcher.dispatch({
		type: "CREATE_RESTAURANT",
		restaurant,
	});
}

export function deleteRestaurant(id) {
	dispatcher.dispatch({
		type: "DELETE_RESTAURANT",
		id,
	});
}

export function fetchRestaurants() {
	dispatcher.dispatch({type: "FETCH_RESTAURANTS"});
	let data;
  fetch('http://localhost:8000/api/restaurants', [{method: 'GET', headers: {'Content-Type': 'JSON'}, mode: 'no-cors', cache: 'default',}]).then(function(response){
		return response.json();
	}).then(function(json){
    data = json;
    dispatcher.dispatch({type: "RECEIVE_RESTAURANTS", restaurants: data});
	}).catch(function(ex){
		console.log('parsing failed', ex);
	});
}

export function updateRestaurant(restaurant) {
	dispatcher.dispatch({
		type: "UPDATE_RESTAURANT",
		restaurant
	});
}
