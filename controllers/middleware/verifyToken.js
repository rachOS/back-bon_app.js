const { json } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.verifyToken = (req, res, next) => {
  const token = req.headers.cookie && req.headers.cookie.slice(4);
  if (token === null) return res.sendStatus(401);
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json(err);
    res.status(200).json(user);
    next();
  });
};
