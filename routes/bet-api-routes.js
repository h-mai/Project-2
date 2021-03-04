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

  // Create a bet
  app.post("/api/create_bet", async (req, res) => {
    // Get all of the bet details from the body
    const user1 = req.body.user1;
    const user2 = req.body.user2;
    const wager = req.body.wager;
    const expires = req.body.expires;

    // Sequelize the new bet
    const bet = await db.Bet.create({
      user1: user1,
      user2: user2,
      wager: wager,
      expires: expires
    });

    // Send an email to other user for them to verify
    const emailMsg = {
      to: user2,
      from: "domenicbeall2@gmail.com",
      subject: "You've been challenged to a friendly bet!",
      html: `<a href="/api/accept_bet/${bet.id}">Click here to accept the bet</a>`
    };

    sgMail
      .send(emailMsg)
      .then(() => {
        console.log("Email sent successfully!");
      })
      .catch(error => {
        console.log(error);
      });

    // Respond with the created bet as a json object
    res.json(bet);
  });

  // To accept a bet
  app.get("/api/accept_bet/:id", (req, res) => {
    const betId = req.params.id;

    //TODO: Make it so the route checks the logged in user ID against the user ID of the person that's supposed to be accepting the bet

    // Find the bet with and ID equal to betId and change its status from pending to accepted
    Bet.update(
      { status: 1 },
      {
        where: {
          id: betId
        }
      }
    ).then(queryresult => {
      // Send the result of the query back
      res.json(queryresult);
    });
  });

  app.get("/api/upvote/${dataId}", (req, res) => {
    const voteDir = req.body.dataVote;

    db.Bet.findOne({
      where: {
        id: req.params.betId
      },
      raw: true
    }).then(bet => {
      if (voteDir === "user1") {
        bet.votes1++;
      } else if (voteDir === "user2") {
        bet.votes2++;
      }

      oneBet.save();

      res.json(bet);
    });
  });
};
