class ErrorCustom extends Error {
  constructor({ name, status, message, err }) {
      super(message)
      this.name = name;
      this.status = status;
      this.err = err;
  }

  get Error() {
      if (this.err)
          return this.err;
      else
          return {
              name: this.name,
              message: this.message
          }
  }

  static errorHandler(err, req, res, next) {
      // console.error(err);
      switch (err.name) {
          case 'SequelizeValidationError':
              res.status(400).json(err.message || err);
              break;
          case "JsonWebTokenError":
              res.status(401).json({message: err.message} || {message: err.Error} || err);
              break;
          default:
              res.status(err.status || 500).json({message: err.message} || err || 'Internal Server Error');
              break;
      }
  }
}

module.exports = ErrorCustom;