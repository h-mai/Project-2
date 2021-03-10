// API routes required for bet management.
const db = require("../models");

// Require in the API for sending emails
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = app => {
  app.get("/", (req, res) => {
    db.Bet.findAll({
      limit: 3,
      order: [["createdAt", "DESC"]],
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
        data: allBets,
        auth: req.user
      };
      res.render("landing", hbsObject);
    });
  });
  // For all bets
  app.get("/bets/:pageNo?", (req, res) => {
    let pageOffset = req.params.pageNo;
    if (pageOffset) {
      pageOffset = parseInt(pageOffset);
    }
    db.Bet.findAndCountAll({
      limit: 10,
      offset: pageOffset,
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
        data: allBets,
        pageNo: pageOffset,
        auth: req.user
      };
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
        data: allBets,
        auth: req.user
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
        data: oneBet,
        auth: req.user
      });
    });
  });

  // Create a bet
  app.post("/api/create_bet", isAuthenticated, async (req, res) => {
    // Get all of the bet details from the body
    const betTitle = req.body.betTitle;
    const user1 = req.user.id;
    const user2Raw = req.body.user2;
    const wager = req.body.wager;
    const expires = req.body.expires;

    db.User.findAll({
      where: {
        username: [user2Raw]
      },
      raw: true
    }).then(users => {
      // TODO this can be coded out now. Need this step to get the bettor / bettee in correct order.
      // It can be removed when the bettor id is pulled from passport
      const orderedUsers = {};
      users.forEach(val => {
        orderedUsers[val.username] = val.id;
      });
      // Sequelize the new bet
      db.Bet.create({
        betTitle: betTitle,
        user1: user1,
        user2: orderedUsers[user2Raw],
        wager: wager,
        expires: expires
      }).then(bet => {
        // Create the email to be sent
        const emailMsg = {
          to: orderedUsers[1].email,
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
  });

  // ACCEPT BET API URL
  app.get("/api/accept_bet/:id", isAuthenticated, (req, res) => {
    const betId = req.params.id;

    // Find the bet with and ID equal to betId and change its status from pending to accepted
    acceptBet(betId, req.user.id).then(queryresult => {
      // Send the result of the query back
      res.json(queryresult);
    });
  });

  // ACCEPT BET USER LINK
  app.get("/accept_bet/:id", isAuthenticated, (req, res) => {
    const betId = req.params.id;
    acceptBet(betId, req.user.id).then(result => {
      if (result[0]) {
        // Success
        res.render("message", {
          goodNews: true,
          content: "You have accepted the bet!  Let the games begin!"
        });
      } else {
        // No good
        res.render("message", {
          goodNews: false,
          content: "This bet has already been accepted or doesn't exist :("
        });
      }
    });
  });

  const acceptBet = (id, user2) => {
    return db.Bet.update(
      { status: 1 },
      {
        where: {
          id: id,
          user2: user2,
          status: 0
        }
      }
    );
  };

  app.put("/api/upvote/:id", isAuthenticated, (req, res) => {
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

  app.get("/api/testing", isAuthenticated, (req, res) => {
    if (!req.user) {
      res.send("Error: You must be authenticated to view this.");
      return;
    }

    res.send("Congrats!  You are authenticated.");
  });
};
