const { UserShema, userOption } = require("../models/UserShema");
const { handleErrors } = require("../helper/handleErrors");
const connection = require("../config");
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
    connection.query(
      "INSERT INTO `user` SET ?",
      [userDatas],
      (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Cet email existe déjà" });
        } else {
          res.cookie("jwt", createToken(userDatas.email));
          return res.status(201).send(userDatas);
        }
      }
    );
  } catch (error) {
    return res.status(400).json(handleErrors(error));
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    await connection.query(
      "SELECT u.email, u.password FROM `user` as u",
      async (err, result) => {
        if (err) {
          return res.sendStatus(500);
        } else {
          const user = await result.find((user) => user.email === email);
          if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
              return res.status(200).send(user);
            } else {
              return res
                .status(404)
                .send({ message: "Le mdp ne correspond pas" });
            }
          } else {
            return res.status(404).send({
              message: "Le nom d'utilisateur est introuvable ou invalide",
            });
          }
        }
      }
    );
  } catch (error) {
    return res.json(handleErrors(error));
  }
};

module.exports.logout = (req, res) => {};
