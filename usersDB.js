const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CITIES = require("./database");
const users = new Schema({
  userName: String,
  country: String,
  Email: String,
  Password: String,
  Plans: [
    {
      PlanDate: {
        startDate: Date,
        endDate: Date,
      },
      Places: [],
      friends: [],
    },
  ],
  picture: String,
});

const user = mongoose.model("user", users);
module.exports = user;
