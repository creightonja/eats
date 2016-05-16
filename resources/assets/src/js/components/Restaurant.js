import React from "react";
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
		return(
			<li>
				<div>{ restaurant.name }</div>
				<div class="{restaurant.rank_direction}">{ restaurant.global_rank }</div>
				<div>{ restaurant.type }</div>
				<div><span>{ restaurant.top_dishes.one }</span><span>{ restaurant.top_dishes.two }</span><span>{ restaurant.top_dishes.three }</span></div>
				<button class="btn btn-primary" onClick={this.handleDelete.bind(this, restaurant)}>Delete</button>
			</li>
		);
	}
}


//<button class="btn btn-primary" onClick={this.deleteRestaurant(restaurant.id).bind(this)}>Delete Restaurant</button>