import React from "react";

import Coverflow from "react-coverflow";
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

  componentDidMount() {
    if (this.state.restaurants[0] == null) {
      RestaurantActions.fetchRestaurants();
    } else {
      console.log(this.state.restaurants);
    }
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

  createRestaurant(restaurant) {
    RestaurantActions.createRestaurant(restaurant);
  }

  fetchRestaurants() {
    RestaurantActions.fetchRestaurants();
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
        <ul class="restaurant-ul">
          <Coverflow width="900" height="600"
            displayQuantityOfSide={2}
            navigation={true}
            enableScroll={true}
            >
        {Restaurants}
          </Coverflow>
        </ul>
        <button class="btn btn-primary" onClick={this.fetchRestaurants.bind(this)}>Fetch Restaurants</button>
        <div>Fetching Restaurants: {this.state.loading ? "true" : "false"} </div>
      </div>
    );
  }
}