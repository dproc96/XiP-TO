module.exports = function (sequelize, DataTypes) {
  let Review = sequelize.define("Review", {
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
    }
  },
  {
    freezeTableName: true,
    hooks: {
      afterCreate: function (review) {
        let User = this.sequelize.models.User;
        //get the user id that created the experience reviewed
        this.sequelize.models.Experience.findByPk(review.ExperienceId).then(function (experience) {
          //update the user score
          User.update({
            score: sequelize.literal("score + 1")
          },
          {
            where: { id: experience.UserId }
          }).then(() => {
            console.log("User score was updated!");          
          });
        });
      }
    }
  });

  Review.association = function (models) {
    Review.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    Review.belongsTo(models.Experience, {
      foreignKey: {
        allowNull: false
      }
    });
      
  };
    
  return Review;
};
  