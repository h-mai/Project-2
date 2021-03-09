module.exports = function(sequelize, DataTypes) {
  const Bet = sequelize.define("Bet", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    betTitle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      }
    },
    user2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      }
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
  Bet.associate = models => {
    Bet.belongsTo(models.User, {
      foreignKey: "user1",
      as: "bettors"
    });
    Bet.belongsTo(models.User, {
      foreignKey: "user2",
      as: "bettees"
    });
  };

  return Bet;
};
