const { expect } = require("chai");
const db = require("../../models");

describe("Test models", () => {
  it("Creates Bets table in database", done => {
    db.Bet.sync({ force: true })
      .then(() => done(null))
      .error(error => done(error));
  });

  it("Creates Users table in database", done => {
    db.User.sync({ force: true })
      .then(() => done(null))
      .error(error => done(error));
  });

  it("Adds a new User to table", async () => {
    const user = await db.User.create({
      username: "tester123",
      email: "test@test.com",
      password: "test"
    });

    expect(user.username).to.equal("tester123");
    expect(user.email).to.equal("test@test.com");
    // expect(user.password).to.equal("test");
  });

  it("Adds a new Bet to table", async () => {
    // Create a new bet between user 1 and user 2

    const bet = await db.Bet.create({
      user1: 1,
      user2: 2,
      wager: 10,
      expires: new Date()
    });

    expect(bet.user1).to.equal(1);
    expect(bet.user2).to.equal(2);
  });
});
