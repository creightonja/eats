import dispatcher from "../dispatcher";
import 'whatwg-fetch';

export function createUser(user) {
	dispatcher.dispatch({
		type: "CREATE_USER",
		user,
	});
}

const myRequest = new Request();

const myHeaders = new Headers({
  'Content-Type': 'JSON'
});

export function fetchRestaurants() {
  dispatcher.dispatch({type: "PENDING_USER"});
  let data;
  fetch('/api/v1/user/signup', [{method: 'POST', headers: {'Content-Type': 'JSON'}, mode: 'no-cors', cache: 'default'}]).then(function(response){
    return response.json();
  }).then(function(response){
    const authorization = response.headers.get('Authorization');
    dispatcher.dispatch({type: "RECEIVED_USER", user: json});
  }).catch(function(ex){
    console.log('parsing failed', ex);
  });
}
