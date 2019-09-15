module.exports = function (sequelize, DataTypes) {
  let Experience = sequelize.define("Experience", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 50],
          msg: "Experience name must have at least 3 and max 20 characters"
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 200],
          msg: "Location must have at least 6 and max 200 characters"
        }
      }
    },
    location2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location3: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [10, 1000],
          msg: "Experience description must have at least 10 and max 1000 characters"
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    freezeTableName: true,
    hooks: {
      //trigger to update the file name and user score after store on database
      afterCreate: function (experience) {

        if (experience.image) {
          let fileName = "experience_" + experience.id + "." + experience.image;
          experience.image = fileName;

          Experience.update({
            image: fileName
          },
          {
            where: {
              id: experience.id
            }
          }).then(() => {
            console.log("Image renamed!");
          });
        }

        //update the user score
        this.sequelize.models.User.update({
          score: sequelize.literal("score + 5")
        },
        {
          where: { id: experience.UserId }
        }).then(() => {
          console.log("User score was updated!");          
        });
        
      }
    }
  });

  Experience.associate = function (models) {
    Experience.hasMany(models.Review, {
      foreignKey: {
        allowNull: true
      }
    });

    Experience.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    Experience.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  };  
  
  return Experience;
};
  