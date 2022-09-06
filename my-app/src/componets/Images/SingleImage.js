import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
export default class SingleImage extends Component {
  addCity = () => {
    axios
      .get(`http://localhost:4000/country/${this.props.detals.FullName}`)
      .then((Result) => {
        console.log(Result.data[0]);
        this.props.addASelectedImage(Result.data[0]);
      });
  };
  removeCity = () => {
    this.props.removeCity(this.props.detals.FullName);
  };
  render() {
    return this.props.selectedImages ? (
      <div className="addToPlans">
        <Link
          to=""
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <img className="planImage" src={this.props.imgSRC} />
            <p className="cityName">{this.props.detals.FullName}</p>
          </div>
        </Link>
        {this.props.redFlag ? (
          <button
            className="buttomToAddForPlans"
            style={{ backgroundColor: "red" }}
            onClick={this.removeCity}
          >
            Alredy Added to this plan
          </button>
        ) : (
          <button
            className="buttomToAddForPlans"
            onClick={this.addCity}
            style={{ backgroundColor: "green" }}
          >
            add to your plan
          </button>
        )}
      </div>
    ) : (
      <Link id="ancer" to={"/city/" + this.props.detals.FullName}>
        <div className="city">
          <img className="cityImage" src={this.props.imgSRC} />
          <p>{this.props.detals.FullName}</p>
        </div>
      </Link>
    );
  }
}
