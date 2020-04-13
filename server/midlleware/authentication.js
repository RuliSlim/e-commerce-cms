const { decodeToken }     = require('../helpers/jwt');
const { User }            = require('../models');
const ErrorCustom  = require('./errorHandler');


const authenticate = (req, res, next) => {
  const token = req.headers.access_token;
  try {
    if(!decodeToken(token)) {
      throw new ErrorCustom({
        name: 'TokenInvalid',
        status: 401,
        message: 'Token is not valid!'
      });
    };
    const { id } = decodeToken(token);
    User.findOne({where: {id}})
      .then((user) => {
        if(!user) {
          throw new ErrorCustom({
            name: 'User Invalid',
            status: 404,
            message: 'User Invalid!'
          });
        }
        req.user = user;
        next();
      })
      .catch((err) => next(err));
  } catch(err) {
    next(err);
  }
}

module.exports = authenticate;
