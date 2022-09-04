import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      redirect: false,
    };
  }

  handelUserName = (event) => {
    this.setState({ userName: event.target.value });
  };

  handelPassword = (event) => {
    this.setState({ password: event.target.value });
  };
  SignIn = () => {
    this.props.SignIn(this.state.userName, this.state.password);
    this.setState({ redirect: true });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else
      return (
        <div className="signIn">
          <div className="Links">
            <Link className="a" to="/SignUp">
              SignUp
            </Link>
            <Link className="a" to="/">
              Home
            </Link>
          </div>

          <table className="table">
            Log In
            <tr>
              <td>UserName </td>
              <td>
                <input
                  className="input"
                  type="text"
                  onChange={this.handelUserName}
                ></input>
              </td>
            </tr>
            <tr>
              <td>Password </td>
              <td>
                <input
                  className="input"
                  type="text"
                  onChange={this.handelPassword}
                ></input>
              </td>
            </tr>
            <tr>
              <button className="button" onClick={this.SignIn}>
                sign in
              </button>
            </tr>
          </table>
        </div>
      );
  }
}
export default SignIn;
