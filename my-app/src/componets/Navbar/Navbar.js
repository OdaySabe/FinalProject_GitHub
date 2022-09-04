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
  render() {
    return (
      <div>
        <div className="nav">
          <NavLink to="/logIn" activeStyle className="logo">
            Log in
          </NavLink>
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
        </div>
      </div>
    );
  }
}
