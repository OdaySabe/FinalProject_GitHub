import { Component } from "react";
import SingleImage from "./SingleImage";

export default class Image extends Component {
  render() {
    return (
      <div className="citiesContainer">
        {this.props.Images.map((singleCity) => {
          return (
            <SingleImage
              detals={singleCity.CityDetails}
              imgSRC={singleCity.CityimageSrc}
            />
          );
        })}
      </div>
    );
  }
}
