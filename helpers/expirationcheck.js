const db = require("../models");
const { Op } = require("sequelize");

module.exports = async () => {
  const expiredBets = await db.Bet.update(
    { status: 2 },
    {
      where: {
        status: {
          [Op.ne]: 2
        },
        expires: {
          [Op.lt]: new Date()
        }
      }
    }
  );

  const affectedRows = expiredBets[0];
  if (affectedRows) {
    console.log(`Bets set to expired: ${affectedRows}`);
  }

  // TODO: Get all of the affected rows and then send out emails informing that the bet has reached it's expiry.
};
