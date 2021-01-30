const { UserShema, userOption } = require("../models/UserShema");
const { LoginShema } = require("../models/LoginShema");
const { createUser } = require("../models/userCrud");
const UserLogin = require("../models/userLogin");
const { handleErrors } = require("../helper/handleErrors");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");
const { verifyToken } = require("./middleware/verifyToken");
const { ERROR_MESSAGE } = require("../helper/ERRORS");

/***
 * TODO
 *  REMAKE with Model (like login)
 *@returns {Object}
 */
module.exports.signup = async (req, res) => {
  const { email, password, repeat_password } = req.body;
  const form = {
    email: email,
    password: password,
    //repeat_password: repeat_password,
  };

  try {
    const userDatas = await UserShema.validateAsync(form, userOption);
    userDatas.password = await bcrypt.hash(password, 10);
    return createUser(userDatas, req, res);
  } catch (error) {
    return res.status(400).json(handleErrors(error));
  }
};

/**
 * Check validation shema,
 * test if email math, then test decrypted password
 * @returns {Object} cookie with token and user datas
 */
module.exports.login = async (req, res, next) => {
  const timeLeft = 60 * 60 * 24;
  try {
    const { email, password } = req.body;
    const form = {
      email: email,
      password: password,
    };
    await LoginShema.validateAsync(form, userOption);
    const db = UserLogin.getDbServiceInstance();
    const [user] = await db.login(email, password).then((response) => response);
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        delete user.password;
        const accessToken = await createToken(user);
        await res.set("Authorization", `Bearer ${accessToken}`);
        await res.status(200).cookie("jwt", accessToken, {
          httpOnly: true,
          maxAge: timeLeft,
          sameSite: true,
        });
        await res.status(200).json({ user });
      }
    }
    next();
  } catch (error) {
    return res.status(500).json(handleErrors(error));
  }
};

/**
 *  autorization function for user session
 *  verifyToken is a middleware
 * @returns {Object} user datas
 */
module.exports.userSession = async (req, res, next) => {
  try {
    verifyToken(req, res, next);
  } catch (error) {
    return res.status(500).json(handleErrors(error));
  }
};

/**
 *  TODO
 */
module.exports.logout = (req, res) => {};
