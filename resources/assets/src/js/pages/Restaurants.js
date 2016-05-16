import React from "react";

import Restaurant from "../components/Restaurant";
import * as RestaurantActions from "../actions/RestaurantActions";
import RestaurantStore from "../stores/RestaurantStore";


export default class Restaurants extends React.Component {
  constructor(){
    super();
    this.getRestaurants = this.getRestaurants.bind(this);
    this.getRestaurantsLoading = this.getRestaurantsLoading.bind(this);
    this.getRanked = this.getRanked.bind(this);
    this.state = {
      restaurants: RestaurantStore.getRestaurants(),
      loading: RestaurantStore.getLoading(),
      ranked: RestaurantStore.getRanks(),
    }
  }

  componentWillMount() {
    RestaurantStore.on("change", this.getRestaurants);
    RestaurantStore.on("change", this.getRestaurantsLoading);
    RestaurantStore.on("change", this.getRanked);

  }

  componentWillUnmount() {
    RestaurantStore.removeListener("change", this.getRestaurants);
    RestaurantStore.removeListener("change", this.getRestaurantsLoading);
    RestaurantStore.removeListener("change", this.getRanked);

  }

  getRestaurants() {
    this.setState({restaurants: RestaurantStore.getRestaurants()});
  }

  getRestaurantsLoading() {
    this.setState({loading: RestaurantStore.getLoading()});
  }

  getRanked() {
    this.setState({ranked: RestaurantStore.getRanks()});
  }

  createRestaurant() {
    RestaurantActions.createRestaurant({name: "Rocky", type: "Beer"});
  }

  reloadRestaurants() {
    RestaurantActions.reloadRestaurants();
  }

  deleteRestaurant(id) {
    RestaurantActions.deleteRestaurant(id);
  }


  render() {
    const Restaurants = this.state.restaurants.map((restaurant, i) => 
      <Restaurant key={i} deleteRestaurant={this.deleteRestaurant.bind(this)} restaurant={restaurant}/> 
    );


    return (
      <div>
        <h1>Restaurants</h1>
        <div class="row">{Restaurants}</div>
        <button class="btn btn-primary" onClick={this.reloadRestaurants.bind(this)}>Reload Restaurants</button>
        <div>Fetching Restaurants: {this.state.loading ? "true" : "false"} </div>
      </div>
    );
  }
}