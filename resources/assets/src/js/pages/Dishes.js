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
		this.getSelected = this.getSelected.bind(this);
		this.getSelectedLoading = this.getSelectedLoading.bind(this);
		this.state = {
			dishes: DishStore.getDishes(),
			loading: DishStore.getLoading(),
			selected: DishStore.getSelected(),
			selectedLoading: DishStore.getSelectedLoading(),
			currentDish: null
		}
	}

	componentWillMount() {
		DishStore.on("change", this.getDishes);
		DishStore.on("change", this.getDishesLoading);
		DishStore.on("change", this.getSelected);
		DishStore.on("change", this.getSelectedLoading);
	}

	componentWillUnmount() {
		DishStore.removeListener("change", this.getDishes);
		DishStore.removeListener("change", this.getDishesLoading);
		DishStore.removeListener("change", this.getSelected);
		DishStore.removeListener("change", this.getSelectedLoading);
	}

	//Trigger initial load of data
	componentDidMount() {
		if (this.state.dishes[0] == null) {
			DishActions.fetchDishes();
		}
	}

	getDishes() {
		this.setState({dishes: DishStore.getDishes()});
	}

	getDishesLoading() {
		this.setState({loading: DishStore.getLoading()});
	}

	//Checks to see if selected dish has been previously loaded
	//If not loaded, retrieve it, then set current Dish to selected id
	getSelected(id) {
		let selectedIndex = this.state.selected.findIndex(x => x.id === id);
		if (selectedIndex !== -1) {
			DishActions.fetchSelected(id);
			selectedIndex = this.selected.findIndex(x => x.id === id);
		}
		this.setState({currentDish: this.state.selected[selectedIndex]});
	}

	getSelectedLoading() {
		this.setState({selectedLoading: DishStore.getSelectedLoading()});
	}

	// createDish(dish) {
	// 	DishActions.createDish(dish);
	// }

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
            {Dishes}
        </ul>
				<button class="btn btn-primary" onClick={this.fetchDishes.bind(this)}>Fetch Dishes</button>
				<div>Fetching Dishes: {this.state.loading ? "true" : "false"} </div>
			</div>
		);
	}
}





