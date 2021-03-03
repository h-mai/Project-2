// API routes required for bet management.
const db = require("../models");

module.exports = app => {
  // For all bets
  app.get("/bets", (req, res) => {
    db.Bet.findAll({
      order: [["expires", "DESC"]]
    }).then(allBets => {
      res.render("all-bets", {
        data: allBets
      });
    });
  });

  // For filtered bets
  app.get("/bets/:catId", (req, res) => {
    db.Bet.findAll({
      where: {
        catId: req.params.catId
      }
    }).then(allBets => {
      res.render("all-bets", {
        data: allBets
      });
    });
  });

  // For a single bet
  app.get("/bet/:betId", (req, res) => {
    db.Bet.findOne({
      where: {
        id: req.params.betId
      },
      raw: true
    }).then(oneBet => {
      res.render("one-bet", {
        data: oneBet
      });
    });
  });
};
