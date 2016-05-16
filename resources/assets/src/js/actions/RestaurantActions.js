import dispatcher from "../dispatcher";

export function createRestaurant(restaurant) {
	dispatcher.dispatch({
		type: "CREATE_RESTAURANT",
		restaurant,
	});
}

export function deleteRestaurant(id) {
	dispatcher.dispatch({
		type: "DELETE_RESTAURANT",
		id,
	});
}

export function reloadRestaurants() {
	let headers = new Headers();
	fetch('http://localhost:8000/api/restaurants', [{method: 'GET', headers: {'Content-Type': 'JSON'}, mode: 'cors', cache: 'default',}]).then(function(response){
		console.log(response);
	});
	dispatcher.dispatch({type: "FETCH_RESTAURANTS"});
	setTimeout(() => {
		dispatcher.dispatch({type: "RECEIVE_RESTAURANTS", restaurants: [
			{
      	id: "5",
        name: "McDonald's",
        rank_direction: "rank-up",
        global_rank: "5",
        type: "Fast Food",
        top_dishes: {
        	one: "Big Mac",
        	two: "Sausage Egg McMuffin",
        	three: "Breakfast Burrito"
        },
      },
      {
      	id: "3",
        name: "Venti's",
        rank_direction: "no-change",
        global_rank: "3",
        type: "Mediterranean",
        top_dishes: {
        	one: "Mediterranean Chicken",
        	two: "Tofu Biscuit",
        	three: "Fallafel",
        },
      },
      {
      	id: "2",
        name: "Paddington's Pizza",
        rank_direction: "rank-up",
        global_rank: "2",
        type: "Pizza",
        top_dishes: {
        	one: "49er",
        	two: "Humdinger",
        	three: "Pistol Pete",
        },
      },
      {
      	id: "1",
        name: "Word of Mouth",
        rank_direction: "no-change",
        global_rank: "1",
        type: "Breakfast",
        top_dishes: {
        	one: "Accidental Omelet",
        	two: "Creme Brulee French Toast",
        	three: "Biscuit and Gravy",
        },
      },
      {
      	id: "4",
      	name: "Gold Dragon",
      	rank_direction: "no-change",
      	global_rank: "4",
      	type: "Chinese",
        top_dishes: {
        	one: "BBQ Pork",
        	two: "Pork Fried Rice",
        	three: "Chicke Chow Mein",
        },
      },
			]});
	}, 2000);
	// if (false) {
	// 	dispatcher.dispatch({type: "FETCH_RESTAURANTS_ERROR"});
	// }
}

export function updateRestaurant(restaurant) {
	dispatcher.dispatch({
		type: "UPDATE_RESTAURANT",
		restaurant
	});
}