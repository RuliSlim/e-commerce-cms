'use strict';
const ErrorCustom  = require('../midlleware/errorHandler');

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: (product, options) => {
        if(product.price < 0) {
          throw new ErrorCustom({
            name: 'BadRequest',
            status: 400,
            message: 'Product price cannot be negative.'
          });
        }
      }
    }
  });
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};