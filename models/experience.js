module.exports = function (sequelize, DataTypes) {
  var Experience = sequelize.define("Experience", {
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
      allowNull: true,
      validate: {
        len: {
          args: [6, 200],
          msg: "Location 2 must have at least 6 and max 200 characters"
        }
      }
    },
    location3: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [6, 200],
          msg: "Location 3 must have at least 6 and max 200 characters"
        }
      }
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
      type: DataTypes.BLOB("long"),
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    freezeTableName: true
  });

  Experience.associate = function (models) {
    Experience.hasMany(models.Review, {
      foreignKey: {
        allowNull: true
      }
    });
  };  
  
  return Experience;
};
  