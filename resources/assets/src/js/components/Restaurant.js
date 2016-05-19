import React from "react";
import RestaurantDish from "./RestaurantDish";
// import * as RestaurantActions from "../actions/RestaurantActions";

export default class Restaurant extends React.Component {
	constructor(props){
	  super();
	}
	handleDelete(restaurant) {
		const id = restaurant.id;
		this.props.deleteRestaurant(id);
	}
	render(){
		const { restaurant } = this.props;
		const Dishes = restaurant.dishes.map((dish, i) => 
				<RestaurantDish key={i} dish={dish}/>
			);
		return(
			<li class="restaurant-li">
				<div class="restaurant-name li-item">Name: { restaurant.name }</div>
				<div class={restaurant.rank_direction + " rank-direction li-item"} >Rank: { restaurant.global_rank }</div>
				<div class="restaurant-type li-item">Restaurant Type: { restaurant.type }</div>
				<div class="restaurant-dishes li-item">Top Dishes: { Dishes }</div>
				<button class="btn btn-primary li-item" onClick={this.handleDelete.bind(this, restaurant)}>Delete</button>
			</li>
		);
	}
}