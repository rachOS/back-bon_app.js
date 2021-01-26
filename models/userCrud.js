const connection = require("../config");
const bcrypt = require("bcrypt");
const { createToken } = require("../helper/jwt");

module.exports.createUser = async (userDatas, req, res) => {
  const user = await userDatas;
  const sql = await "INSERT INTO `user` SET ?";
  await connection.query(sql, [user], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Cet email existe déjà" });
    } else {
      res.cookie("jwt", createToken(userDatas.email), { httpOnly: true });
      return res.status(201).send(userDatas);
    }
  });
};
