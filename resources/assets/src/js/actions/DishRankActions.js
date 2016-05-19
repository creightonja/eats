import dispatcher from "dispatcher";
import 'whatwg-fetch';

export function createDishRanks(list) {
	dispatcher.dispatch({
		type: "CREATE_DISH_RANKS",
		list
	});
}

export function removeDishRanks() {
	dispatcher.dispatch({
		type: "REMOVE_DISH_RANKS",
	});
}

export function saveRanks(list) {
	dispatcher.dispatch({
		type: "SAVE_DISH_RANKS",
		list
	});
}

export function fetchRanks(id) {
	dispatcher.dispatch({type "FETCH_DISH_RANKS"});
	fetch('http://localhost:8000/api/v1/userDishRanks/' + id, [{method: 'GET', headers: {'Content-Type': 'JSON'}, mode: 'no-cors', cache: 'default',}]).then(function(response){
		return response.json();
	}).then(function(json){
		dispatcher.dispatch({type: "RECEIVE_DISH_RANKS", json});
	}).catch(function(ex){
		console.log('parsing failed', ex);
	});	
}

export function submitRanks(user) {
		dispatcher.dispatch({type "SUBMIT_DISH_RANKS"});
	fetch('http://localhost:8000/api/v1/userDishRanks/' + user.id, [{method: 'POST', headers: {'Content-Type': 'JSON'}, mode: 'no-cors', cache: 'default',}]).then(function(response){
		return response.json();
	}).then(function(json){
		dispatcher.dispatch({type: "RECEIVE_DISH_RANKS"})
	}).catch(function(ex){
		console.log('parsing failed', ex);
	});	
}