module.exports = function(sequelize, DataTypes) {
  const Bet = sequelize.define("Bets", {
    user1: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    user2: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    wager: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    votes1: {
      type: DataTypes.NUMBER,
      defaultValue: 0
    },
    votes2: {
      type: DataTypes.NUMBER,
      defaultValue: 0
    },
    // 0: pending, 1: approved, 2: ended
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    // 0: pending, 1: won, 2: lost, 3: draw.
    outcome: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  });

  return Bet;
};
