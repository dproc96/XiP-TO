module.exports = function (sequelize, DataTypes) {
  var Review = sequelize.define("Review", {
    liked: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [6, 200],
          msg: "Comment must have at least 3 and max 500 characters"
        }
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    freezeTableName: true
  });

  Review.association = function (models) {
    Review.belongsTo(models.Experience, {
      foreignKey: {
        allowNull: false
      }
    });
      
    Review.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
      
  };
    
  return Review;
};
  