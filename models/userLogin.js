const connection = require("../config");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");

module.exports.userLogin = async (user, res) => {
  const { email, password } = await user;
  const sql = "SELECT u.* , u.id FROM `user` as u";
  connection.query(sql, async (err, result) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      const user = await result.find((user) => user.email === email);
      if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
          delete user.password;
          res.cookie("jwt", createToken(user.id), {
            httpOnly: true,
            maxAge: 36000,
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
    }
  });
};
