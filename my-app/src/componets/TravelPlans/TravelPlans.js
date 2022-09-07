import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DisplayPlan from "./DisplayPlan";
export default class TravelPlans extends Component {
  constructor() {
    super();
    this.state = {
      LoggedUser: null,
    };
  }
  componentDidMount = () => {
    axios.get("http://localhost:4000/loggedUser").then((RESULT) => {
      this.setState({ LoggedUser: RESULT.data }, () => {
        this.setState({ Plans: this.state.LoggedUser.Plans });
      });
    });
  };

  render() {
    return this.state.LoggedUser ? (
      <div>
        <div className="UserProfile">
          <div>
            <img className="image" src={this.state.LoggedUser.picture} />
            <h3>{this.state.LoggedUser.userName} Profile</h3>
            <h3>{this.state.LoggedUser.Email}</h3>
            <h3>Living in {this.state.LoggedUser.country}</h3>
          </div>
          <div className="userProfileLinks">
            <Link to="/">return Home Page</Link>
            <Link to="/creatPlan">add new Plan</Link>
            <Link to="/joinedplans">Plans joined</Link>
          </div>
        </div>

        {this.state.LoggedUser.Plans.length > 0 ? (
          <div>
            <h1 className="K">My Plans</h1>
            {this.state.LoggedUser.Plans.map((plan) => {
              return <DisplayPlan EachPlan={plan} />;
            })}
          </div>
        ) : (
          <div
            className="noPlans"
            style={{ fontSize: "large", height: "fit-content" }}
          >
            user have no planse yet
          </div>
        )}
      </div>
    ) : (
      <h1>Loading....</h1>
    );
  }
}
