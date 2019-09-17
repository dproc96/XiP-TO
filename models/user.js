module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define("User", {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 50],
          msg: "User first name must have at least 3 and max 50 characters"
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 50],
          msg: "User last name must have at least 3 and max 50 characters"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "This e-mail is already registered"
      },
      validate: {
        len: {
          args: [1, 200],
          msg: "E-mail must have max 200 characters"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 60],
          msg: "Password must have at least 8 characters"
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
    User.hasMany(models.Review, {
      
      foreignKey: {
        allowNull: false
      }
    });
    User.hasMany(models.Experience, {
      foreignKey: {
        allowNull: false
      }
    });

  
    
  };  

  return User;
};
