import { Component } from "react";
import axios from "axios";
import moment from "moment";
import { Link, Redirect } from "react-router-dom";
export default class UserPage extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount = () => {
    axios
      .get(
        `http://localhost:4000/UserProfile/${this.props.match.match.params.userId}`
      )
      .then((RESULT) => {
        if (!RESULT.err) {
          this.setState({ user: RESULT.data });
        }
      });
  };
  JoinPlan = (planId) => {
    axios
      .post("http://localhost:4000/PlanJoin", {
        planId: planId,
        userId: this.props.match.match.params.userId,
      })
      .then((RESULT) => {
        if (!RESULT.data.err) {
          this.setState({ user: RESULT.data });
        } else {
          alert("You Alredy Joint it");
        }
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
  displayUserPlan = () => {
    return this.state.user.Plans.map((EachPlan) => {
      return (
        <div className="userPlansInfo">
          <h3>
            Start at :{moment(EachPlan.PlanDate.startDate).format("YYYY/MM/DD")}
          </h3>
          <h3>
            End at :{moment(EachPlan.PlanDate.endDate).format("YYYY/MM/DD")}
          </h3>
          <h3>
            Total of{" "}
            {moment(EachPlan.PlanDate.endDate).format("DD") -
              moment(EachPlan.PlanDate.startDate).format("DD")}{" "}
            Days
          </h3>
          <p>
            total of <strong>({EachPlan.Places.length})</strong> Cities{" "}
          </p>
          <div className="UserPlanCities">
            {EachPlan.Places.map((city) => {
              return this.renderPlaces(city);
            })}
          </div>
          <span></span>
          <div className="listOfJoiners">
            {EachPlan.friends.map((friend) => {
              return <img className="Joiner" src={friend.picture} />;
            })}
          </div>
          <button
            className="Join"
            onClick={() => {
              this.JoinPlan(EachPlan._id);
            }}
          >
            Join this {this.state.user.userName}'s Plan?
          </button>
        </div>
      );
    });
  };
  displayUser = () => {
    return (
      <div className="HomeUser">
        <div className="userInfo">
          {!this.props.noBack ? (
            <Link className="noPlans" to="/listOfUsers">
              Go Back
            </Link>
          ) : (
            <Link className="noPlans" to="/Plans">
              Retrun
            </Link>
          )}
          <img className="UserPicture" src={this.state.user.picture} />
        </div>
        {this.state.user.Plans.length != 0 ? (
          this.displayUserPlan()
        ) : (
          <div className="noPlans">
            <h1>{this.state.user.userName} not having plans yet</h1>
          </div>
        )}
      </div>
    );
  };
  render() {
    return this.state.user ? this.displayUser() : <h1>Loading....</h1>;
  }
}
