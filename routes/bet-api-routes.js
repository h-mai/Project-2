// API routes required for bet management.
const db = require("../models");

module.exports = app => {
  app.get("/api/bets", (req, res) => {
    db.Bet.findAll({}).then(allBets => {
      res.render("bets", {
        data: allBets
      });
    });
  });

  app.get("/api/bets/:catId", (req, res) => {
    db.Bet.findAll({
      where: {
        catId: req.params.catId
      }
    }).then(allBets => {
      res.render("bets", {
        data: allBets
      });
    });
  });
};
