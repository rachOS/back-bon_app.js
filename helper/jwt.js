const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.createToken = (email) => {
  return jwt.sign({ email: email }, process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 24,
  });
};
