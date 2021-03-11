// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
const cron = require("node-cron");
const expcheck = require("./helpers/expirationcheck");
// Requiring passport as we've configured it
require("dotenv").config();
const passport = require("./config/passport");

// Init dotenv
require("dotenv").config();

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(
  "/bootstrap",
  express.static(__dirname + "node_modules/bootstrap/dist")
);
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars
const exphbs = require("express-handlebars");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    helpers: require("./config/handlebars-helpers")
  })
);
app.set("view engine", "handlebars");

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/bet-api-routes.js")(app);
require("./routes/form-api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:8080/ in your browser.",
      PORT,
      PORT
    );
  });
});

// Call expcheck() every 1 minute.
cron.schedule("*/1 * * * *", () => {
  expcheck();
});
