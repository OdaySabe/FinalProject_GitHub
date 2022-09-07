import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./componets/HomePage/HomePage";
import City from "./componets/City/City";
import axios from "axios";
import SignIn from "./componets/sign/SignIn";
import SignUp from "./componets/sign/SignUp";
import LoggingOut from "./componets/logOut/LoggingOut";
import TravelPlans from "./componets/TravelPlans/TravelPlans";
import NewPlan from "./componets/TravelPlans/NewPlan";
import ListOfUsers from "./componets/ListOfUsers/ListOfUsers";
import UserPage from "./componets/ListOfUsers/UserPage";

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchCity: "",
      continent: "",
      LoggedUser: null,
    };
    axios.get("http://localhost:4000").then((RESULT) => {
      this.setState({ citiesInfo: RESULT.data });
    });
  }
  componentDidMount = () => {
    this.setState({ searchCity: "", continent: "" });
    this.loggedUser();
  };
  filterCities = (searchInput) => {
    if (searchInput) {
      this.setState({ searchCity: searchInput }, () => {
        this.filter();
      });
    } else {
      this.setState({ searchCity: "" }, () => {
        this.filter();
      });
    }
  };
  filterContinent = (newContinent) => {
    this.setState({ continent: newContinent }, () => {
      this.filter();
    });
  };
  filter = () => {
    axios
      .get(
        `http://localhost:4000/filter?continent=${this.state.continent}&searchCity=${this.state.searchCity}`
      )
      .then((RESULT) => {
        this.setState({ citiesInfo: RESULT.data });
      });
  };
  specificCity = (full_name) => {
    axios.get(`http://localhost:4000/country/${full_name}`).then((RESULT) => {
      this.setState({ pickedCity: RESULT });
    });
  };

  renderAfterFitchData() {
    if (this.state.citiesInfo) {
      return true;
    } else {
      return false;
    }
  }
  SignIn = (userName, password) => {
    let user = { userName: userName, Password: password };
    return axios.post("http://localhost:4000/signIn", user);
  };
  SignUp = (userName, country, email, password) => {
    return axios.post("http://localhost:4000/signUp", {
      userName: userName,
      country: country,
      email: email,
      Password: password,
    });
  };
  loggedUser = () => {
    axios.get("http://localhost:4000/loggedUser").then((RESULT) => {
      if (!RESULT.data.err) {
        this.setState({ LoggedUser: RESULT.data });
      } else {
        this.setState({ LoggedUser: null });
      }
    });
  };
  logOut = () => {
    axios.get("http://localhost:4000/logOut").then(() => {
      this.loggedUser();
    });
  };
  UploadToTheUserPlans = (a, b, c) => {
    return axios.post("http://localhost:4000/addToUserPlans", {
      startDate: a,
      endDate: b,
      cities: c,
    });
  };
  render() {
    return (
      <div>
        {this.renderAfterFitchData() ? (
          <div>
            {
              <Router>
                <div>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <HomePage
                        citiesInfo={this.state.citiesInfo}
                        searchCity={this.state.searchCity}
                        filteredCities={this.filterCities}
                        filterContinent={this.filterContinent}
                        LoggedUser={this.state.LoggedUser}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/city/:cityName"
                    render={({ match }) => {
                      return (
                        <City
                          match={match}
                          specificCity={this.specificCity}
                          pickedCity={this.state.pickedCity}
                          LoggedUser={this.state.LoggedUser}
                        />
                      );
                    }}
                  />

                  <div className="Routes">
                    <Route
                      path="/logIn"
                      exact
                      render={() => {
                        return (
                          <SignIn
                            loggedUser={this.loggedUser}
                            SignIn={this.SignIn}
                          />
                        );
                      }}
                    ></Route>
                    <Route
                      path="/SignUp"
                      exact
                      render={() => {
                        return (
                          <SignUp
                            loggedUser={this.loggedUser}
                            SignUp={this.SignUp}
                          />
                        );
                      }}
                    ></Route>
                    <Route
                      path="/logOut"
                      exact
                      render={() => {
                        return <LoggingOut logOut={this.logOut} />;
                      }}
                    ></Route>
                    <Route
                      path="/Plans"
                      render={() => {
                        return <TravelPlans />;
                      }}
                    />
                  </div>
                  <Route
                    path="/creatPlan"
                    render={() => {
                      return (
                        <div>
                          <NewPlan
                            LoggedUser={this.state.LoggedUser}
                            filteredCities={this.filterCities}
                            filterContinent={this.filterContinent}
                            Images={this.state.citiesInfo}
                            UploadToTheUserPlans={this.UploadToTheUserPlans}
                          />
                        </div>
                      );
                    }}
                  ></Route>
                  <Route
                    path="/listOfUsers"
                    exact
                    render={() => {
                      return <ListOfUsers />;
                    }}
                  ></Route>
                  <Route
                    path="/UserPage/:userId"
                    render={(match) => {
                      return <UserPage match={match} />;
                    }}
                  ></Route>
                </div>
              </Router>
            }
          </div>
        ) : (
          <h1>Loading.....</h1>
        )}
      </div>
    );
  }
}
export default App;
