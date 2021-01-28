const { UserShema, userOption } = require("../models/UserShema");
const { createUser } = require("../models/userCrud");
const UserLogin = require("../models/userLogin");
const { handleErrors } = require("../helper/handleErrors");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");

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
    const db = UserLogin.getDbServiceInstance();
    const result = db.login();
    const users = await result.then((response) => response);
    const user = await users.find((user) => user.email === email);
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
      } else {
        return res.status(404).send({ message: "Le mdp ne correspond pas" });
      }
    } else {
      return res.status(404).send({
        message: "Le nom d'utilisateur est introuvable ou invalide",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json(handleErrors(error));
  }
};

module.exports.logout = (req, res) => {};
