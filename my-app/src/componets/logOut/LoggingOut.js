import { Component } from "react";
import { Redirect } from "react-router-dom";

export default class LoggingOut extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }
  leaveOrStay = (leave) => {
    if (leave) {
      this.setState({ redirect: true }, () => {
        this.props.logOut();
      });
    } else {
      this.setState({ redirect: true });
    }
  };
  render() {
    return this.state.redirect ? (
      <Redirect to="/" />
    ) : (
      <div className="noPlans">
        <h1>Are you sure you want to log out ?</h1>
        <button
          className="Join"
          onClick={(event) => {
            this.leaveOrStay(true);
          }}
        >
          I Want to Logout
        </button>
        <button
          className="Join"
          onClick={(event) => {
            this.leaveOrStay(false);
          }}
        >
          I will stay
        </button>
      </div>
    );
  }
}
