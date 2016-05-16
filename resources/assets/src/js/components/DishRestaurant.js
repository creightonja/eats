import React from "react";


export default class DishRestaurant extends React.Component {
	constructor(props){
		super();
	}
	render(){
		const { restaurant } = this.props;
		return(
			<span>{ restaurant.name }</span>
		);
	}
}