const uuid              = require('uuid/v4');
const { User }          = require('../models');
const {signToken}         = require('../helpers/jwt');
const {comparePassword}   = require('../helpers/bcrypt');

class UserController {
  static create(req, res, next) {
    const { email, password, name } = req.body;
    User.create({id: uuid(), email, password, name})
      .then((user) => {
        const token = signToken(user);
        res.status(201).json({access_token: token, role: user.role})
      })
      .catch(err => next(err));
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({where: {email}})
      .then(user => {
        if(!user) throw new Error('User not found');
        if(!comparePassword(user, password)) throw new Error('User or Password wrong');
        const token = signToken(user);
        res.status(200).json({ access_token: token, role: user.role, user: user.name });
      })
      .catch(err => next(err));
  }
}

module.exports = UserController;