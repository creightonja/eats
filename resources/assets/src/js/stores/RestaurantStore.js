import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class RestaurantStore extends EventEmitter {
	constructor() {
		super();
    this.loading = false;
    this.ranked = [];
    this.restaurants = [];
	}

  //Need to set up API for this
	createRestaurant(restaurant) {
		const id = Date.now();
		this.restaurants.push({
			id: id,
			name: restaurant.name,
			rank_direction: "no-change",
			global_rank: "not ranked",
			type: restaurant.type
		});
		this.emit("change");
	}

  getRestaurants() {
  	return this.restaurants;
  }

  getLoading() {
    return this.loading;
  }

  getRanks() {
    return this.ranks;
  }

  handleActions(action) {
    console.log(action.type);
    switch(action.type) {
      case "CREATE_RESTAURANT": {
        this.createRestaurant(action.restaurant);
        break;
      }
      case "FETCH_RESTAURANTS": {
        this.loading = true;
        this.emit("change");
        break;
      }
      case "RECEIVE_RESTAURANTS": {
        this.restaurants = action.restaurants;
        this.loading = false;
        this.emit("change");
        break;
      }
      case "DELETE_RESTAURANT": {
        const restaurantIndex = this.restaurants.findIndex(x => x.id === action.id);
        if (restaurantIndex !== -1) {
          this.restaurants.splice(restaurantIndex, 1);
        }
        this.emit("change");
        break;
      }
      case "UPDATE_RESTAURANT": {
        const restaurantIndex = this.restaurants.findIndex(x => x.id === action.restaurant.id);
        if (restaurantIndex !== -1) {
          restaurantIndex.name = action.restaurant.name;
          restaurantIndex.type = action.restaurant.type;
        }
        this.emit("change");
        break;
      }
      default: {
        break;
      }
    }
  }
}

const restaurantStore = new RestaurantStore;

dispatcher.register(restaurantStore.handleActions.bind(restaurantStore));

//Window allows global command access from dev tools console
// window.restaurantStore = restaurantStore;

export default restaurantStore;