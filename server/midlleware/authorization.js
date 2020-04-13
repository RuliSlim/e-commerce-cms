const ErrorCustom  = require('./errorHandler');


const authAdmin = (req, res, next) => {
  try {
    if(req.user.role !== 'admin') {
      throw new ErrorCustom({
        name: 'TokenInvalid',
        status: 401,
        message: 'Access denied!'
      });
    }
    next();
  } catch(err) {
    next(err);
  }
}

module.exports = authAdmin;