import { Component } from "react";
import { Link } from "react-router-dom";
export default class SingleImage extends Component {
  render() {
    return (
      <Link id="ancer" to={"/city/" + this.props.detals.FullName}>
        <div className="city">
          <img className="cityImage" src={this.props.imgSRC} />
          <p>{this.props.detals.FullName}</p>
        </div>
      </Link>
    );
  }
}
