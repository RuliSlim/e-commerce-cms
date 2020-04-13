const bcrypt = require('bcrypt');

const hashPassword = (user) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(user.password, salt);
}

const comparePassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
}

module.exports = {
  comparePassword,
  hashPassword
}
