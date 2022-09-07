import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class ListOfUsers extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount = () => {
    axios.get("http://localhost:4000/allSiteUsers").then((RESULT) => {
      if (!RESULT.data.err) {
        this.setState({ USERS: RESULT.data });
      }
    });
  };
  displayUser = (user) => {
    return (
      <Link to={"/UserPage/" + user._id} className="signleUser">
        <img src={user.picture} className="userImage" />
        <span>{user.userName}</span>
        <span className="forUnderLine">{user.Email}</span>

        {user.Plans.length > 0 ? (
          <p>
            {user.userName} <strong>({user.Plans.length}) </strong>plans for
            travel
          </p>
        ) : (
          <p>No plans</p>
        )}
      </Link>
    );
  };

  render() {
    return this.state.USERS ? (
      <div>
        <Link to="/" className="Home">
          Back to Home
        </Link>
        <p
          style={{
            backgroundColor: "#FF9999",
            margin: "10px",
            marginLeft: "90%",
            display: "inline",
            padding: "2px",
            borderRadius: "8%",
            color: "white",
          }}
        >
          {this.state.USERS.length + 1} users Registed
        </p>

        <div className="users">
          {this.state.USERS.map((eachUser) => {
            return this.displayUser(eachUser);
          })}
        </div>
      </div>
    ) : (
      <h1>Loading....</h1>
    );
  }
}
