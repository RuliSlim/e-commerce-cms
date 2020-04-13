const { decodeToken } = require('../helpers/jwt');
const { User }        = require('../models');

const authAdmin = (req, res, next) => {
  try {
    if(req.user.role !== 'admin' || !req.user) throw new Error('Access denied');
    next();
  } catch(err) {
    next(err);
  }
}

module.exports = authAdmin;