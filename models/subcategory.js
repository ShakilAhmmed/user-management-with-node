'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Category, {
        foreignKey: 'category_id'
      });
    }
  }
  SubCategory.init(
    {
      category_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'SubCategory'
    }
  );
  return SubCategory;
};
