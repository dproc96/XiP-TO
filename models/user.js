module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 50],
          msg: "User name must have at least 3 and max 20 characters"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: "E-mail must have max 100 characters"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 20],
          msg: "Password must have at least 8 and max 20 characters"
        }
      }
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    freezeTableName: true
  });

  User.associate = function (models) {
    User.hasMany(models.Experience, {
      foreignKey: {
        allowNull: false
      }
    });

    User.hasMany(models.Review, {
      foreignKey: {
        allowNull: false
      }
    });
    
  };  

  return User;
};
