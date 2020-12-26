const { UsersShema } = require("../models/UsersShema");
const { handleErrors } = require("../functions/handleErrors");

module.exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    res.status(201).json(await UsersShema.validateAsync({ email, password }));
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
