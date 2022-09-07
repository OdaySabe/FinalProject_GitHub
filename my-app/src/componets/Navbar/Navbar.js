import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

export default class Navbar extends Component {
  filterCities = (e) => {
    this.props.filteredCities(e.target.value);
  };
  filterContinent = (e) => {
    this.props.filterContinent(e.target.value);
  };
  componentWillUnmount = () => {
    this.props.filteredCities("");
    this.props.filterContinent("");
  };
  renderSelectors = () => {
    return (
      <div className="inputs">
        <input
          className="search"
          type="text"
          placeholder=" Search city or country"
          value={this.props.searchCity}
          onChange={(event) => {
            this.filterCities(event);
          }}
        ></input>
        <select
          className="search"
          onChange={(event) => {
            this.filterContinent(event);
          }}
        >
          <option value="">All Contenints</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    );
  };
  displayUserLoggedOrNot = () => {
    if (!this.props.LoggedUser) {
      return (
        <div className="nav">
          <NavLink to="/logIn" activeStyle className="logo">
            Log in
          </NavLink>
          {this.renderSelectors()}
        </div>
      );
    } else {
      return (
        <div className="nav">
          <NavLink to="/logOut" activeStyle className="logo">
            Log out
          </NavLink>
          {this.renderSelectors()}
          <NavLink to="/Plans" activeStyle className="logo">
            My Profile
          </NavLink>
          <NavLink to="/listOfUsers" className="logo">
            WebSite users
          </NavLink>
          <div className="userInfo">
            <img className="image" src={this.props.LoggedUser.picture}></img>
            <p>{this.props.LoggedUser.userName}</p>
            <p>{this.props.LoggedUser.Email}</p>
          </div>
        </div>
      );
    }
  };
  render() {
    return this.displayUserLoggedOrNot();
  }
}
