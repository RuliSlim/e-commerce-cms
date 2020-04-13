const errorHandler = (err, req, res, next) => {
  if(err.message.includes('email') || err.message.includes('login') || err.message.includes('exist') || err.name == 'JsonWebTokenError') {
    return res.status(400).json({ message: err.message});
  }
  if(err.message == ('User invalid' || 'You are not authorized')) {
    return res.status(403).json({ message: err.message });
  }
  if(err.name == 'SequelizeValidationError') {
    let msg;
    if(err.errors.length) {
      msg = [];
      err.errors.forEach(el => {
        msg.push(el.message);
      })
      return res.status(400).json({ message: msg });
    } else {
      return res.status(400).json({ message: err.error.message })
    }
  }
  if(err.name == 'Error') {
    return res.status(404).json({ message: err.message })
  } else {
    return res.status(500).json({ message: 'Internal Server Error'})
  }
}

module.exports = errorHandler;