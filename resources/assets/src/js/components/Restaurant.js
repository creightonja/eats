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
		console.log(Dishes);
		return(
			<li>
				<div>{ restaurant.name }</div>
				<div class="{ restaurant.rank_direction }">{ restaurant.global_rank }</div>
				<div>{ restaurant.type }</div>
				<button class="btn btn-primary" onClick={this.handleDelete.bind(this, restaurant)}>Delete</button>
				<div>{ Dishes }</div>
			</li>
		);
	}
}