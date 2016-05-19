import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Restaurants from "./pages/Restaurants";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dishes from "./pages/Dishes";
import DishRanks from "./pages/DishRanks";
import RestaurantRanks from "./pages/RestaurantRanks";
import Auth from "./pages/Auth";

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="restaurants(/:restaurant)" name="restaurants" component={Restaurants}></Route>
      <Route path="dishes" name="dishes" component={Dishes}></Route>
      <Route path="restaurantranks" name="restaurantranks" component={RestaurantRanks}></Route>
      <Route path="dishranks" name="dishranks" component={DishRanks}></Route>
      <Route path="auth" name="auth" component={Auth}></Route>
    </Route>
  </Router>,
app);