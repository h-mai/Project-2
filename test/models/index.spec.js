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
      email: "test@test.com",
      password: "test"
    });

    expect(user.email).to.equal("test@test.com");
  });
});
