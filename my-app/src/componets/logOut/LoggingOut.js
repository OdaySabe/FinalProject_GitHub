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
      <div>
        <h1>
          Are you sure you want to log out ?
          <button
            onClick={(event) => {
              this.leaveOrStay(true);
            }}
          >
            yes
          </button>
          <button
            onClick={(event) => {
              this.leaveOrStay(false);
            }}
          >
            no
          </button>
        </h1>
      </div>
    );
  }
}
