const { UserShema, userOption } = require("../models/UserShema");
const { handleErrors } = require("../helper/handleErrors");
const bcrypt = require("bcrypt");
const connection = require("../config");

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
    connection.query(
      "INSERT INTO `user` SET ?",
      [userDatas],
      (err, results) => {
        if (err) {
          return res.status(500).json({ message: err.sqlMessage });
        } else {
          return res.status(201).send(userDatas);
        }
      }
    );
  } catch (error) {
    return res.status(500).json(handleErrors(error));
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
