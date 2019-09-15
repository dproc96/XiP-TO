module.exports = function (sequelize, DataTypes) {
  let Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 50],
          msg: "Category name must have at least 3 and max 20 characters"
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

  Category.associate = function (models) {
    Category.hasMany(models.Experience,{
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Category;
};
  