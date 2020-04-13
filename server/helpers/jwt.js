const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const signToken = (user) => {
  const payload = {
    iss: 'Server',
    id: user.id,
    iat: new Date().getTime()
  }
  return jwt.sign(payload, secret, {expiresIn: '24h'});
}

const decodeToken = (token) => {
  return jwt.verify(token, secret);
}

module.exports = {
  signToken,
  decodeToken
}
