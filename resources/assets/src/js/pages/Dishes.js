import React from "react";
import Coverflow from "react-coverflow";

import Dish from "../components/Dish";
import * as DishActions from "../actions/DishActions";
import DishStore from "../stores/DishStore";

export default class Dishes extends React.Component {
	constructor(){
		super();
		this.getDishes = this.getDishes.bind(this);
		this.getDishesLoading = this.getDishesLoading.bind(this);
		this.state = {
			dishes: DishStore.getDishes(),
			loading: DishStore.getLoading(),
		}
	}

	componentWillMount() {
		DishStore.on("change", this.getDishes);
		DishStore.on("change", this.getDishesLoading);
	}

	componentWillUnmount() {
		DishStore.removeListener("change", this.getDishes);
		DishStore.removeListener("change", this.getDishesLoading);
	}

	//Trigger initial load of data
	componentDidMount() {
		if (this.state.dishes[0] == null) {
			DishActions.fetchDishes();
		} else {
			console.log(this.state.dishes);
		}
	}

	getDishes() {
		this.setState({dishes: DishStore.getDishes()});
	}

	getDishesLoading() {
		this.setState({loading: DishStore.getLoading()});
	}

	createDish(dish) {
		DishActions.createDish(dish);
	}

	//Command for initiating restaurant load from API
	fetchDishes() {
		DishActions.fetchDishes();
	}

	deleteDish(id) {
		DishActions.deleteDish(id);
	}

	render() {
		const Dishes = this.state.dishes.map((dish, i ) => <Dish key={i} dish={dish}/>);
		return (
			<div>
				<h1>Dishes</h1>
				<ul class="dish-ul">
          <Coverflow width="900" height="400"
            displayQuantityOfSide={2}
            navigation={true}
            enableScroll={true}>
            {Dishes}
          </Coverflow>
        </ul>
			</div>
		);
	}
}





