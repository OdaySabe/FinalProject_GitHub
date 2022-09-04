import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      country: "",
      email: "",
      password: "",
      redirect: false,
    };
  }

  handelUserName = (event) => {
    this.setState({ userName: event.target.value });
  };

  handelCountry = (event) => {
    this.setState({ country: event.target.value });
  };

  handelEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  SignUp = () => {
    this.props.SignUp(
      this.state.userName,
      this.state.country,
      this.state.email,
      this.state.password
    );
    this.setState({ redirect: true });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div className="Links">
          <Link className="a" to="/logIn">
            Log in
          </Link>
          <Link className="a" to="/">
            Home
          </Link>
        </div>
        <table className="table">
          Sign up
          <tr>
            <td>userName </td>
            <td>
              <input
                className="input"
                required
                type="text"
                onChange={this.handelUserName}
              ></input>
            </td>
          </tr>
          <tr>
            <td>Country </td>
            <td>
              <input
                className="input"
                required
                type="text"
                onChange={this.handelCountry}
              ></input>
            </td>
          </tr>
          <tr>
            <td>Email </td>
            <td>
              <input
                className="input"
                required
                type="text"
                onChange={this.handelEmail}
              ></input>
            </td>
          </tr>
          <tr>
            <td>Password </td>
            <td>
              <input
                className="input"
                requiredtype="password"
                onChange={this.handlePassword}
              ></input>
            </td>
          </tr>
          <tr>
            <td>
              <button className="button" onClick={this.SignUp}>
                sign up
              </button>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}
export default SignIn;
