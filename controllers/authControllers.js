const { UserShema, userOption } = require("../shemas/users/UserShema");
const { LoginShema } = require("../shemas/users/LoginShema");
const User = require("../models/User");
const { handleErrors } = require("../helper/handleErrors");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");
const { verifyToken } = require("./middleware/verifyToken");

const timeLeft = 60 * 60 * 24;

/***
 *Controller to create an user account,
 *then hash passwird and add a token for the session
 *@returns {Object} boolean
 */
module.exports.signup = async (req, res) => {
  try {
    const { email, password, repeat_password } = req.body;
    const form = {
      email: email,
      password: password,
      //repeat_password: repeat_password,
    };
    console.log("REQ", form);
    const userForm = await UserShema.validateAsync(form, userOption);
    userForm.password = await bcrypt.hash(password, 10);
    const db = User.getDbServiceInstance();
    const createdUser = await db
      .createUser(userForm)
      .then((response) => {
        return response;
      })
      .catch((error) => res.status(500).send(handleErrors(error.Error)));
    console.log("Create", createdUser);
    if (createdUser.insertId) {
      delete userForm.password;
      userForm.id = createdUser.insertId;
      const accessToken = await createToken(userForm);
      await res.cookie("jwt", accessToken, {
        httpOnly: true,
        maxAge: timeLeft,
        sameSite: true,
      });
      return res
        .status(201)
        .json({ isCreated: true, id: createdUser.insertId });
    }
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
  try {
    const { email, password } = req.body;
    const form = {
      email: email,
      password: password,
    };
    await LoginShema.validateAsync(form, userOption);
    const db = User.getDbServiceInstance();
    const [user] = await db.login(email, password).then((response) => response);
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        delete user.password;
        const accessToken = await createToken(user);
        await res
          .status(200)
          .cookie("jwt", accessToken, {
            httpOnly: true,
            maxAge: timeLeft,
            sameSite: true,
          })
          .json({ isAuthenticated: true });
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
module.exports.userProfile = async (req, res, next) => {
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
