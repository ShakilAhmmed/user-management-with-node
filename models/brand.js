'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Brand.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      slug: DataTypes.STRING,
      icon: DataTypes.TEXT,
      phone: DataTypes.STRING,
      address: DataTypes.TEXT,
      status: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'Brand'
    }
  );
  return Brand;
};
