"use strict";
// Simple route to return data required for form.
const db = require("../models");

module.exports = app => {
  // Get me the members
  app.get("/api/members/getUsernames", (req, res) => {
    db.User.findAll({
      attributes: ["id", "username"],
      order: [["username", "ASC"]]
    }).then(allUsers => {
      res.json(allUsers);
    });
  });
};
