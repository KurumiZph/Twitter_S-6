// token.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');

function generateToken(payload) {
  return jwt.sign(payload, secretKey);
}

module.exports = {
  generateToken
};
