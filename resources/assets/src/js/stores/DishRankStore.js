import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class DishRankStore extends EventEmitter {
	constructor() {
		super();
		this.dish_ranks = [];
		this.loading = false;
	}

	getDishRanks() {
		return this.dish_ranks;
	}

	getLoading() {
		return this.loading;
	}

	createDishRanks(list) {
		this.dish_ranks = list;
	}

	deleteDishRanks() {
		this.dish_ranks = [];
	}

	handleActions(action) {
		console.log(action);
		switch(action.type) {
			case "CREATE_DISH_RANKS": {
				this.dish_ranks = action.list;
				this.emit("change");
				break;
			}
			case "REMOVE_DISH_RANKS": {
				this.deleteDishRanks();
				this.emit("change");
				break;
			}
			case "FETCH_DISH_RANKS": {
				this.loading = true;
				this.emit("change");
				break;
			}
			case "RECEIVE_DISH_RANKS": {
				this.createDishRanks(action.json);
				this.loading = false;				
				this.emit("change");
				break;
			}
			case "SUBMIT_DISH_RANKS": {

			}
		}
	}

}