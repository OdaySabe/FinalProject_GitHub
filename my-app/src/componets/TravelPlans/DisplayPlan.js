import axios from "axios";
import { Component } from "react";
import moment, { months } from "moment";
import { Link } from "react-router-dom";

export default class DisplayPlan extends Component {
  constructor() {
    super();
    this.state = {};
  }
  renderPlaces = (singleCity) => {
    return (
      <div>
        <img className="userPageImage" src={singleCity.CityimageSrc} />
        <p>{singleCity.CityDetails.FullName}</p>
      </div>
    );
  };
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

  render() {
    return this.props.EachPlan ? (
      <div className="userPlansInfo">
        <h3>
          Start at :
          {moment(this.props.EachPlan.PlanDate.startDate).format("YYYY/MM/DD")}
        </h3>
        <h3>
          End at :
          {moment(this.props.EachPlan.PlanDate.endDate).format("YYYY/MM/DD")}
        </h3>
        <h3>
          Total of{" "}
          {moment(this.props.EachPlan.PlanDate.endDate).format("DD") -
            moment(this.props.EachPlan.PlanDate.startDate).format("DD")}{" "}
          Days
        </h3>
        <p>
          total of <strong>({this.props.EachPlan.Places.length})</strong> Cities{" "}
        </p>
        <div className="UserPlanCities">
          {this.props.EachPlan.Places.map((city) => {
            return this.renderPlaces(city);
          })}
        </div>
        <span></span>
        <div className="listOfJoiners">
          {this.props.EachPlan.friends.map((friend) => {
            return (
              <Link to={"/seeMore/" + friend._id}>
                <img className="Joiner" src={friend.picture} />
              </Link>
            );
          })}
        </div>
      </div>
    ) : (
      <h1>Loading</h1>
    );
  }
}
