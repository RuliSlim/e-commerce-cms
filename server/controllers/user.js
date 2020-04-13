const uuid              = require('uuid/v4');
const { User }          = require('../models');
const {signToken}         = require('../helpers/jwt');
const {comparePassword}   = require('../helpers/bcrypt');

class UserController {
  static create(req, res, next) {
    const { email, password, name } = req.body;
    User.create({id: uuid(), email, password, name})
      .then((user) => {
        res.json({id: user.id, role: user.role})
      })
  }

  static login(req, res, next) {
    // console.log('masuk ga')
    const { email, password } = req.body;
    User.findOne({where: {email}})
      .then(user => {
        if(!user) throw new Error('User not found');
        if(!comparePassword(user, password)) throw new Error('User or Password wrong');
        const token = signToken(user);
        res.status(200).json({ access_token: token, role: user.role });
      })
  }
}

module.exports = UserController;