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
      <div className="userDetalsPlans">
        <Link to="/">return Home Page</Link>
        <h1>TravelPlans of {this.state.LoggedUser.userName}</h1>
        <img src={this.state.LoggedUser.picture} />
        <h2>{this.state.LoggedUser.Email}</h2>
        <h2>{this.state.LoggedUser.country}</h2>
        <Link to="/creatPlan">add new Plan</Link>
        {this.state.Plans ? (
          <div>
            {this.state.Plans.map((plan) => {
              console.log(plan);
              return (
                <DisplayPlan
                  id={plan._id}
                  Places={plan.Places}
                  PlanDate={plan.PlanDate}
                />
              );
            })}{" "}
          </div>
        ) : (
          <h1>user have no planse yet</h1>
        )}
      </div>
    ) : (
      <h1>Loading....</h1>
    );
  }
}
