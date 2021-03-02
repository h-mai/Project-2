module.exports = function(sequelize, DataTypes) {
  const Bet = sequelize.define("Bet", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user2: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    wager: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    votes1: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    votes2: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false
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
