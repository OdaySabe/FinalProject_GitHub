import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Image from "../Images/Image";
export default class HomePage extends Component {
  render() {

    return (
      <div>
        <Navbar LoggedUser={this.props.LoggedUser} filteredCities={this.props.filteredCities} searchCity={this.props.searchCity}   filterContinent={this.props.filterContinent} />    
           <Image  Images={this.props.citiesInfo}/> ;
      </div>
    );
  }
}
