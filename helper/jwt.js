const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.createToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY, {
    expiresIn: "20s",
  });
};
