const { decodeToken }     = require('../helpers/jwt');
const { User }            = require('../models');

const authenticate = (req, res, next) => {
  const token = req.headers.access_token;
  try {
    if(!decodeToken(token)) throw new Error('Invalid Token');
    const { id } = decodeToken(token);
    User.findOne({where: {id}})
      .then((user) => {
        if(!user) throw new Error('User not found');
        req.user = user;
      })
      .catch((err) => next(err));
  } catch(err) {
    next(err);
  }
}

module.exports = authenticate;
