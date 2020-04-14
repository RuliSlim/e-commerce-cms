'use strict';
const { hashPassword }     = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'custommer'),
      allowNull: false,
      defaultValue: 'customer'
    }
  }, {
    hooks: {
      beforeCreate: (user, option) => {
        const hashedPassword = hashPassword(user);
        user.password = hashedPassword;
      }
    }, sequelize
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};