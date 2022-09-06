import axios from "axios";
import { Component } from "react";
import moment, { months } from "moment";

export default class DisplayPlan extends Component {
  constructor() {
    super();
    this.state = {};
  }
  calcuateDays = () => {
    const days =
      moment(this.props.PlanDate.endDate).format("DD") -
      moment(this.props.PlanDate.startDate).format("DD");
    const months =
      moment(this.props.PlanDate.endDate).format("MM") -
      moment(this.props.PlanDate.startDate).format("MM");
    const years =
      moment(this.props.PlanDate.endDate).format("YYYY") -
      moment(this.props.PlanDate.startDate).format("YYYY");
    return <h3>Days : {days + 30 * months + 360 * years}</h3>;
  };
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
        <span>
          start date :{" "}
          {moment(this.props.PlanDate.startDate).format("YYYY-MM-DD")}
        </span>
        <span>
          end date :{moment(this.props.PlanDate.endDate).format("YYYY-MM-DD")}
        </span>
        <span>Length of the trip :{this.calcuateDays()}</span>
        <h1>Cities to visit</h1>
        <div>
          {this.state.planData.map((singleImage) => {
            return (
              <div className="planImages">
                <h3>{singleImage.CityDetails.FullName}</h3>
                <img
                  className="planImagesPicture"
                  src={singleImage.CityimageSrc}
                ></img>
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      <h1>Loading</h1>
    );
  }
}
