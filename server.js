const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const mongoose = require("mongoose");
const allCities = require("./database");
const Users = require("./usersDB");
const session = require("express-session");
const { request, response } = require("express");
const { populate } = require("./database");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mydb", {
  useNewUrlParser: true,
});
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  next();
});
server.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60, sameSite: true, secure: false },
  })
);
let Sesstion = null;
const PORT = 4000;

server.get("/SesstionJoinedPlans", (request, response) => {
  let listOfJoinedPlans = [];
  let res = {};
  console.log(Sesstion);
  Users.find({ _id: { $ne: Sesstion._id } }).exec((err, result) => {
    result.forEach((user) => {
      user.Plans.forEach((plan) => {
        plan.friends.forEach((friend) => {
          if (friend._id + "" == Sesstion._id + "") {
            listOfJoinedPlans.push({ userImage: user.picture, plan: plan });
          }
        });
      });
    });

    response.send(listOfJoinedPlans);
  });
});

server.post("/PlanJoin", (request, response) => {
  Users.findById(request.body.userId).exec((err, result) => {
    result.Plans.forEach((plan) => {
      if (plan._id == request.body.planId) {
        let NewJoint = {
          _id: Sesstion._id,
          userName: Sesstion.userName,
          picture: Sesstion.picture,
        };
        let push = true;
        plan.friends.forEach((friend) => {
          if (friend._id + "" == NewJoint._id + "") {
            push = false;
          }
        });
        if (push == true) {
          plan.friends.push(NewJoint);
          result.save();
          response.send(result);
        } else {
          response.send({ err: "Already Joined" });
        }
      }
    });
  });
});

server.get("/UserProfile/:userID", (request, response) => {
  Users.findById(request.params.userID).exec((err, result) => {
    if (!result || err) {
      response.send({ err: "user can not be found" });
    } else {
      response.send(result);
    }
  });
});

server.get("/allSiteUsers", (request, response) => {
  Users.find({ _id: { $ne: Sesstion._id } }).exec((err, result) => {
    if (err || !result) {
      response.send({ err: "no users yet for this site" });
    } else {
      response.send(result);
    }
  });
});
server.post("/getCities", async (request, response) => {
  let Cities = [];
  for (i = 0; i < request.body.length; i++) {
    allCities.find({ _id: request.body[i] }).exec((_err, result) => {
      Cities.push(result[0]);
    });
  }
  setTimeout(() => {
    response.send(Cities);
  }, 500);
});

server.post("/addToUserPlans", (request, response) => {
  let Places = [];
  request.body.cities.forEach((city) => {
    Places.push(city);
  });
  Sesstion.Plans.push({
    PlanDate: {
      startDate: request.body.startDate,
      endDate: request.body.endDate,
    },
    Places: Places,
  });
  Sesstion.save();
  response.end();
});
server.get("/loggedUser", (request, response) => {
  if (Sesstion) {
    response.send(Sesstion);
  } else {
    response.send({ err: "Not logged yet" });
  }
});
server.get("/logOut", (request, response) => {
  Sesstion = null;
  response.end("data");
});
server.post("/signUp", (request, response) => {
  axios.get("https://randomuser.me/api/").then((Pincture) => {
    Sesstion = new Users({
      userName: request.body.userName,
      country: request.body.country,
      Email: request.body.email,
      Password: request.body.Password,
      Plans: [],
      picture: Pincture.data.results[0].picture.large,
    });
    Sesstion.save();
    response.send(Sesstion);
  });
});
server.post("/signIn", (request, response) => {
  Users.find(request.body).exec((err, result) => {
    if (result[0]) {
      Sesstion = result[0];
      response.send(Sesstion);
    } else {
      response.send({ err: "user not found" });
    }
  });
});
server.get("/", (request, response) => {
  allCities.find({}).exec(function (error, result) {
    response.send(result);
  });
});
server.get("/filter", (request, response) => {
  allCities
    .find({
      $and: [
        {
          "CityDetails.continent": {
            $regex: request.query.continent,
            $options: "i",
          },
        },
        {
          "CityDetails.FullName": {
            $regex: request.query.searchCity,
            $options: "i",
          },
        },
      ],
    })
    .exec(function (error, result) {
      if (error) {
        response.status(404);
      } else {
        response.send(result);
      }
    });
});
server.get("/country/:country", (request, response) => {
  allCities
    .find({
      "CityDetails.FullName": {
        $regex: request.params.country,
        $options: "i",
      },
    })
    .exec(function (error, result) {
      if (error) {
        response.status(404);
      } else {
        response.send(result);
      }
    });
});
server.listen(PORT, () => {
  console.log("server start listining");
});
