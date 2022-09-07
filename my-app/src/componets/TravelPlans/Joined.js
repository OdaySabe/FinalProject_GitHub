import axios from "axios";
import { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
export default class Joined extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount = () => {
    axios.get("http://localhost:4000/SesstionJoinedPlans").then((RESULT) => {
      this.setState({ visitedPlans: RESULT.data });
    });
  };
  renderPlaces = (singleCity) => {
    return (
      <div>
        <img className="userPageImage" src={singleCity.CityimageSrc} />
        <p>{singleCity.CityDetails.FullName}</p>
      </div>
    );
  };
  displayUserPlan = (plan) => {
    return (
      <div className="userPlansInfo">
        <h3>
          Start at :{moment(plan.PlanDate.startDate).format("YYYY/MM/DD")}
        </h3>
        <h3>End at :{moment(plan.PlanDate.endDate).format("YYYY/MM/DD")}</h3>
        <h3>
          Total of{" "}
          {moment(plan.PlanDate.endDate).format("DD") -
            moment(plan.PlanDate.startDate).format("DD")}{" "}
          Days
        </h3>
        <p>
          total of <strong>({plan.Places.length})</strong> Cities{" "}
        </p>
        <div className="UserPlanCities">
          {plan.Places.map((city) => {
            return this.renderPlaces(city);
          })}
        </div>
        <span></span>
        <div className="listOfJoiners">
          {plan.friends.map((friend) => {
            return <img className="Joiner" src={friend.picture} />;
          })}
        </div>
      </div>
    );
  };

  displayUser = (arrayOfPlans) => {
    return arrayOfPlans.map((user) => {
      return (
        <div className="HomeUser">
          <div className="userInfo">
            <img className="UserPicture" src={user.userImage} />
          </div>

          {this.displayUserPlan(user.plan)}
        </div>
      );
    });
  };
  render() {
    console.log(this.state.visitedPlans);
    return this.state.visitedPlans ? (
      <div>
        {
          <Link className="noPlans" to="/Plans">
            back
          </Link>
        }
        <h1 className="K">what {this.props.loggedUser.userName} had joined </h1>

        {this.displayUser(this.state.visitedPlans)}
      </div>
    ) : (
      <h1 className="K">
        {this.props.loggedUser.userName} Not Joined in any plans yet
      </h1>
    );
  }
}
