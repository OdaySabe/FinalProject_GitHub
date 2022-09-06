import React, { Component } from "react";
export default class City extends Component {
  constructor() {
    super();
  }
  componentDidMount = () => {
    this.props.specificCity(this.props.match.params.cityName);
  };

  showDetails = (mounted) => {
    if (mounted) {
      const data = this.props.pickedCity.data[0];
      return (
        <div className="CityInDetails">
          {this.props.LoggedUser ? (
            <div className="userInfo">
              <img className="image" src={this.props.LoggedUser.picture}></img>
            </div>
          ) : (
            <div></div>
          )}
          <h1>City of {this.props.match.params.cityName}</h1>
          <h3>Placed in continent of : {data.CityDetails.continent}</h3>
          <img src={data.CityimageSrc} />
          <p> the mayor of that city is {data.CityDetails.mayor}</p>
          <p>
            {this.props.match.params.cityName} Is placed on EARTH Bounding :{" "}
          </p>
          <div className="Bounding">
            <p>{data.CityDetails.boundingBox.north} for north</p>
            <p>{data.CityDetails.boundingBox.south} for south</p>
            <p>{data.CityDetails.boundingBox.east} for east</p>
            <p>{data.CityDetails.boundingBox.west} for west</p>
          </div>
        </div>
      );
    }
  };
  render() {
    return <div>{this.showDetails(this.props.pickedCity)}</div>;
  }
}
