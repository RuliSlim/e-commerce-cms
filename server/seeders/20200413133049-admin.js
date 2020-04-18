'use strict';
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: uuid(),
        name: 'Admin',
        email: 'email@email.com',
        password: bcrypt.hashSync('password', salt),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        name: 'userBiasa',
        email: 'email2@email.com',
        password: bcrypt.hashSync('password', salt),
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
