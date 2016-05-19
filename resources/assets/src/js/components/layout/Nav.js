import React from "react";
import { IndexLink, Link } from "react-router";

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const homeClass = location.pathname === "/" ? "active" : "";
    const restaurantsClass = location.pathname.match(/^\/restaurants/) ? "active" : "";
    const dishesClass = location.pathname.match(/^\/dishes/) ? "active" : "";
    const restaurantRanksClass = location.pathname.match(/^\/restaurantranks/) ? "active" : "";
    const dishRanksClass = location.pathname.match(/^\/dishranks/) ? "active" : "";
    const authClass = location.pathname.match(/^\/auth/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    return (
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li class={homeClass}>
                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Home</IndexLink>
              </li>
              <li class={restaurantsClass}>
                <Link to="restaurants" onClick={this.toggleCollapse.bind(this)}>Restaurants</Link>
              </li>
              <li class={dishesClass}>
                <Link to="dishes" onClick={this.toggleCollapse.bind(this)}>Dishes</Link>
              </li>
              <li class={restaurantRanksClass}>
                <Link to="restaurantranks" onClick={this.toggleCollapse.bind(this)}>Restaurant Ranks</Link>
              </li>
              <li class={dishRanksClass}>
                <Link to="dishranks" onClick={this.toggleCollapse.bind(this)}>Dish Ranks</Link>
              </li>
              <li class={authClass}>
                <Link to="auth" onClick={this.toggleCollapse.bind(this)}>Auth</Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}