const { UserShema, userOption } = require("../models/UserShema");
const { LoginShema } = require("../models/LoginShema");
const { createUser } = require("../models/userCrud");
const UserLogin = require("../models/userLogin");
const { handleErrors } = require("../helper/handleErrors");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");
const { ERROR_MESSAGE } = require("../helper/ERRORS");

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
        res.cookie("jwt", createToken(user.id), {
          httpOnly: true,
          maxAge: timeLeft,
          sameSite: true,
        });
        res.status(200).json({ user });
      }
    }
    next();
  } catch (error) {
    return res.status(500).json(handleErrors(error));
  }
};

module.exports.logout = (req, res) => {};
