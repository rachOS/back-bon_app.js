const jwt = require("jsonwebtoken");
const { handleErrors } = require("../../helper/handleErrors");
require("dotenv").config();

/**
 *  middleware to allow user session
 * @returns {Object} user datas
 */
module.exports.verifyToken = async (req, res, next) => {
  try {
    const authToken = await req.cookies.jwt;
    if (authToken === null) return await res.sendStatus(401);
    await jwt.verify(authToken, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json(err);
      res.status(200).json(user);
      next();
    });
  } catch (error) {
    return res.status(500).json(handleErrors(error));
  }
};
