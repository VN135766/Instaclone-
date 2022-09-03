const jwt = require('jsonwebtoken');

const dotenv = require("dotenv");
dotenv.config()

const jwtSecret = process.env.JWT_SECRET;
const expiration = '200h';

console.log("creating a new token now")
module.exports = {
  signToken: function({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, jwtSecret, { expiresIn: expiration });
  }
};