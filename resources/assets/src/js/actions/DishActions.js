import Dispatcher from "../dispatcher";

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

export function apiGetDishes(){
	dispatcher.dispatch({
		type: "FETCHING_DISHES",
	});
	dispatcher.dispatch({
		type: "RECEIVE_RESTAURANTS",
		restaur
	});
}