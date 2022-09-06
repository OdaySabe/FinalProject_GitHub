import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
export default class SingleImage extends Component {
  addCity = () => {
    axios
      .get(`http://localhost:4000/country/${this.props.detals.FullName}`)
      .then((Result) => {
        this.props.addASelectedImage(Result.data[0]._id);
      });
  };
  render() {
    return this.props.LoggedUser ? (
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
          >
            Alredy Added to this plan
          </button>
        ) : (
          <button className="buttomToAddForPlans" onClick={this.addCity}>
            add to your plan
          </button>
        )}
      </div>
    ) : (
      <Link
        id="ancer"
        to={"/city/" + this.props.detals.FullName}
        onClick={(e) => {
          if (this.props.noLink) {
            e.preventDefault();
          }
        }}
      >
        <div className="city">
          <img className="cityImage" src={this.props.imgSRC} />
          <p>{this.props.detals.FullName}</p>
        </div>
      </Link>
    );
  }
}
