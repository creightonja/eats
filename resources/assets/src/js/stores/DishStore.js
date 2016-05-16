import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class DishStore extends EventEmitter {
	constructor() {
		super();
		this.dishes = [];
		this.loading = false;
		this.ranked = [];
	}

	createDish(dish) {
		this.dishes.push({
			id: dish.id,
			name: dish.name,
			rank_direction: "no-change",
			global_rank: "not ranked",
			type: dish.type
		});
	}

	updateDish(id) {
    const dishIndex = this.dishs.findIndex(x => x.id === id);
    if (dishIndex !== -1) {
      dishIndex.name = action.dish.name;
      dishIndex.type = action.dish.type;
    }
  }

  deleteDish(id) {
  	const dishIndex = this.dishes.findIndex(x => x.id === id);
  	if (dishIndex !== -1) {
  		this.dishes.splice(dishIndex, 1);
  	}
  }

	getDishes() {
		return this.dishes;
	}

	getLoading() {
		return this.loading;
	}

	getRanks() {
		return this.ranks;
	}

	handleActions(action) {
		console.log(action);
		switch(action.type) {
			case "CREATE_DISH": {
				this.createDish(action.dish);
				this.emit("change");
				break;
			}
			case "FETCH_DISHES": {
				this.loading = true;
				this.emit("change");
				break;
			}
			case "RECIEVE_DISHES": {
				this.dishes = action.dishes;
				this.loading = false;
				this.emit("change");
				break;
			}
			case "UPDATE_RESTAURANT": {
				this.updateDish(action.restaurant);
				this.emit("change");
				break;
			}
			case "DELETE_DISH": {
				this.deleteDish(action.id);
				this.emit("change");
				break;
			}
			default: {
				break;
			}
		}
	}
}

const dishStore = new DishStore;

dispatcher.register(dishStore.handleActions.bind(dishStore));

export default dishStore;



