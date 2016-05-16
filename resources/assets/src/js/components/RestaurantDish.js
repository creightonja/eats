import React from "react";

export default class RestaurantDish extends React.Component {
	constructor(){
		super();
	}
	render(){
		const { dish } = this.props;
		return(
			<span>{dish.name}</span>
		);
	}
}