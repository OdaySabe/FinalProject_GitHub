import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./componets/HomePage/HomePage";
import City from "./componets/City/City";
import axios from "axios";
import SignIn from "./componets/sign/SignIn";
import SignUp from "./componets/sign/SignUp";
class App extends Component {
  constructor() {
    super();
    this.state = {
      searchCity: "",
      continent: "",
    };
    axios.get("http://localhost:4000").then((RESULT) => {
      this.setState({ citiesInfo: RESULT.data });
    });
  }
  componentDidMount = () => {
    this.setState({ searchCity: "", continent: "" });
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
    console.log(userName, password);
  };
  SignUp = (userName, country, email, password) => {
    console.log(userName, password, country, email);
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
                        />
                      );
                    }}
                  />

                  <div className="Routes">
                    <Route
                      path="/logIn"
                      exact
                      render={() => {
                        return <SignIn SignIn={this.SignIn} />;
                      }}
                    ></Route>
                    <Route
                      path="/SignUp"
                      exact
                      render={() => {
                        return <SignUp SignUp={this.SignUp} />;
                      }}
                    ></Route>
                  </div>
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
