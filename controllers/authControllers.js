const { UserShema, userOption } = require("../models/UserShema");
const { handleErrors } = require("../functions/handleErrors");
const bcrypt = require("bcrypt");

module.exports.signup = async (req, res, next) => {
  const { email, password, repeat_password } = req.body;
  const form = {
    email: email,
    password: password,
    //repeat_password: repeat_password,
  };
  try {
    form.password = await bcrypt.hash(password, 10);
    const userDatas = await UserShema.validateAsync(form, userOption);
    res.status(201).json(userDatas);
    next();
  } catch (error) {
    res.status(500).json(handleErrors(error));
  }
};

module.exports.login = async (req, res) => {
  /* const { email, password } = req.body;
  try {
    const authUser = UserShema.validate({ email, password });
    res.status(200).send(authUser.value);
  } catch (error) {
    //handleErrors(error);
    res.status(500).send(error);
  } */
};

module.exports.logout = (req, res) => {
  /*  try {
    res.send("logout");
  } catch (error) {
    //handleErrors(error);
    res.status(500).send(error);
  } */
};
