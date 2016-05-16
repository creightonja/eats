import React from "react";
import * as DishActions from "../actions/DishActions";
import DishRestaurant from "../components/DishRestaurant";

export default class Dish extends React.Component {
	constructor(props) {
		super();
	}
	deleteDish(id) {
		DishActions.deleteDish(id);
	}
	render() {
		const { dish } = this.props;
		return(
			<li>
				<div>{ dish.name }</div>
				<div class="{ dish.rank_direction }">{ dish.global_rank }</div>
				<div>{ dish.type }</div>
				<button class="btn btn-primary" onClick={this.deleteDish.bind(this, dish.id)}>Delete Dish</button>
				<DishRestaurant restaurant={dish.restaurant}/>
			</li>
		);
	}
}