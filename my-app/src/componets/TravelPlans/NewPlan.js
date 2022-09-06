import { Component } from "react";
import { Redirect } from "react-router-dom";
import Image from "../Images/Image";
export default class NewPlan extends Component {
  constructor() {
    super();
    this.state = {
      startDate: "",
      endDate: "",
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
    this.props
      .UploadToTheUserPlans(
        this.state.startDate,
        this.state.endDate,
        this.state.cities
      )
      .then(() => {
        this.setState({ redirect: true });
      });
  };

  render() {
    console.log(this.state);
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
              onChange={(e) => {
                this.setState({ startDate: e.target.value });
              }}
            />
            <label>End Date</label>
            <input
              type="date"
              onChange={(e) => {
                this.setState({ endDate: e.target.value });
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
            <button onClick={this.UploadToTheUserPlans}>Submit Plan</button>
            <h3>
              Day from {this.state.startDate} to {this.state.endDate}
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
