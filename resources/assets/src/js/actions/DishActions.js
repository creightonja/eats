import dispatcher from "../dispatcher";
import 'whatwg-fetch';

export function createDish(dish){
	dispatcher.dispatch({
		type: "CREATE_DISH",
		dish
	});
}

export function updateDish(dish){
	dispatcher.dispatch({
		type: "UPDATE_DISH",
		dish
	});
}

export function deleteDish(id){
	dispatcher.dispatch({
		type: "DELETE_DISH",
		id
	});
}

export function fetchDishes(){
	dispatcher.dispatch({type: "FETCH_DISHES"});
	fetch('http://localhost:8000/api/v1/dishesRestaurant', [{method: 'GET', headers: {'Content-Type': 'JSON'}, mode: 'no-cors', cache: 'default',}]).then(function(response){
		return response.json();
	}).then(function(json){
    dispatcher.dispatch({type: "RECIEVE_DISHES", dishes: json});
	}).catch(function(ex){
		console.log('parsing failed', ex);
	});
}
