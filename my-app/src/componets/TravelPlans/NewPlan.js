import { Component } from "react";
import { Redirect } from "react-router-dom";
import Image from "../Images/Image";
import moment from "moment";
export default class NewPlan extends Component {
  constructor() {
    super();
    this.state = {
      startDate: "",
      endDate: "",
      NumberOfDays: 0,
      cities: [],
      redirect: false,
    };
  }
  setCities = (cities) => {
    this.setState({ cities: cities });
  };
  filterCities = (e) => {
    this.props.filteredCities(e.target.value);
  };
  filterContinent = (e) => {
    this.props.filterContinent(e.target.value);
  };

  UploadToTheUserPlans = () => {
    if (
      this.state.endDate &&
      this.state.startDate &&
      this.state.cities.length != 0
    ) {
      this.props
        .UploadToTheUserPlans(
          this.state.startDate,
          this.state.endDate,
          this.state.cities
        )
        .then(() => {
          this.setState({ redirect: true });
        });
    } else {
      alert("Please full all the inputs first");
    }
  };

  render() {
    return this.state.redirect ? (
      <Redirect to="Plans" />
    ) : (
      <div>
        <div className="newPlan">
          <div>
            <img className="image" src={this.props.LoggedUser.picture}></img>

            <h1>Select your PlanDate</h1>
            <label>Start Date:</label>
            <input
              type="date"
              value=""
              onChange={(e) => {
                this.setState({
                  startDate: e.target.value,
                });
              }}
            />
            <label>End Date</label>
            <input
              type="date"
              value=""
              onChange={(e) => {
                this.setState({
                  endDate: e.target.value,
                });
              }}
            />
          </div>
          <div className="newPlanInputs">
            <input
              type="text"
              placeholder=" Search city or country"
              value={this.props.searchCity}
              onChange={(event) => {
                this.filterCities(event);
              }}
            ></input>
            <select
              onChange={(event) => {
                this.filterContinent(event);
              }}
            >
              <option value="">All Contenints</option>
              <option value="Asia">Asia</option>
              <option value="Africa">Africa</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Oceania">Oceania</option>
            </select>
            <button
              onClick={() => {
                this.setState({ redirect: true });
              }}
            >
              Back to plans
            </button>
            <button onClick={this.UploadToTheUserPlans}>Submit Plan</button>
            <h3>
              your Plan time is : Day from{" "}
              {moment(this.state.startDate).format("MM/DD/YYYY")} Until{" "}
              {moment(this.state.endDate).format("MM/DD/YYYY")}
              {this.state.startDate && this.state.endDate ? (
                <h3>
                  Total Days{" "}
                  {moment(this.state.endDate).format("DD") -
                    moment(this.state.startDate).format("DD")}{" "}
                </h3>
              ) : (
                <h3></h3>
              )}
            </h3>
          </div>
        </div>
        <Image
          LoggedUser={this.props.LoggedUser}
          Images={this.props.Images}
          cities={this.setCities}
        />
      </div>
    );
  }
}
