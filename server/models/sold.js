'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sold = sequelize.define('Sold', {
    dateSale: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Sold.associate = function(models) {
    // associations can be defined here
    Sold.belongsTo(models.Product);
  };
  return Sold;
};