const { UserShema, userOption } = require("../models/UserShema");
const { createUser } = require("../models/userCrud");
const { userLogin } = require("../models/userLogin");
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

module.exports.login = async (req, res) => {
  try {
    const user = await req.body;
    return userLogin(user, res);
  } catch (error) {
    return res.json(handleErrors(error));
  }
};

module.exports.logout = (req, res) => {};
