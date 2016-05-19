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
			<li class="dish-li">
				<div class="li-item dish-name">{ dish.name }</div>
				<div class={dish.rank_direction + " li-item rank-direction" }>{ dish.global_rank }</div>
				<div class="li-item dish-type">{ dish.type }</div>
				<div class="li-item dish-restaurant"><DishRestaurant restaurant={dish.restaurant}/></div>
				<button class="btn btn-primary" onClick={this.deleteDish.bind(this, dish.id)}>Delete Dish</button>
			</li>
		);
	}
}