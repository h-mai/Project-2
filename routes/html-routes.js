// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/signup", (req, res) => {
    if (req.user) {
      res.redirect("/");
    }
    res.render("signup");
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/");
    }
    res.render("login");
  });

  app.get("/createbet", isAuthenticated, (req, res) => {
    res.render("createbet", { auth: req.user });
  });

  app.get("/allbets", (req, res) => {
    // Users can view all existing bets
    res.render("allbets", { auth: req.user });
  });

  app.get("/faqs", (req, res) => {
    res.render("faqs", { auth: req.user });
  });

  app.get("/aboutus", (req, res) => {
    res.render("aboutUs", { auth: req.user });
  });
};
