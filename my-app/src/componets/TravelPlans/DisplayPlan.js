import axios from "axios";
import { Component } from "react";
import SignIn from "../sign/SignIn";

export default class DisplayPlan extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount = () => {
    axios
      .post("http://localhost:4000/getCities", this.props.Places)
      .then((RESULT) => {
        this.setState({ planData: RESULT.data });
      });
  };
  render() {
    return this.state.planData ? (
      <div className="planSector">
        {this.state.planData.map((singleImage, index) => {
          return (
            <div className="planImages">
              <h1>day {index}</h1>
              <h3>{singleImage.CityDetails.FullName}</h3>
              <img
                className="planImagesPicture"
                src={singleImage.CityimageSrc}
              ></img>

              <span>start date : {this.props.PlanDate.startDate}</span>
              <span>end date :{this.props.PlanDate.endDate}</span>
            </div>
          );
        })}
      </div>
    ) : (
      <h1>Loading</h1>
    );
  }
}
