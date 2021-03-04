// API routes required for bet management.
const db = require("../models");

// Require in the API for sending emails
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = app => {
  // For all bets
  app.get("/bets", (req, res) => {
    db.Bet.findAll({
      order: [["expires", "DESC"]],
      include: [
        {
          model: db.User,
          as: "bettors",
          attributes: ["username"]
        },
        {
          model: db.User,
          as: "bettees",
          attributes: ["username"]
        }
      ],
      nested: true,
      raw: false
    }).then(allBets => {
      const hbsObject = {
        data: allBets
      };
      console.log(hbsObject);
      res.render("all-bets", hbsObject);
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
    db.Bet.create({
      user1: user1,
      user2: user2,
      wager: wager,
      expires: expires
    }).then(bet => {
      // Create the email to be sent
      const emailMsg = {
        to: user2,
        from: "domenicbeall2@gmail.com",
        subject: "You've been challenged to a friendly bet!",
        html: `<a href="/api/accept_bet/${bet.id}">Click here to accept the bet</a>`
      };

      // Send the email using sgmail
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

  app.put("/api/upvote/:id", (req, res) => {
    const betId = req.params.id;
    const voteDir = req.body.dataVote;
    // set a default variable to update.
    let updateMe = { votes1: +1 };

    // if the vote is for the other user we can change it.
    if (voteDir === "user2") {
      updateMe = { votes2: +1 };
    }

    db.Bet.increment(updateMe, {
      where: {
        id: betId
      }
    }).then(queryResult => {
      res.json(queryResult);
    });
  });
};
