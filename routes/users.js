const express = require("express");
const router = express.Router();
const connection = require("../config");

// get all users
router.get("/", (req, res) => {
  connection.query("SELECT * FROM `user`", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// get one user
router.get("/:idUser", (req, res) => {
  const { idUser } = req.params;
  connection.query(
    "SELECT * FROM `user` WHERE id = ?",
    [idUser],
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      if (results.length === 0) {
        res.status(404).send(err);
      } else {
        res.json(results[0]);
      }
    }
  );
});

// create one user
router.post("/", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO `user` SET ?", [formData], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

// put one user
router.put("/:idUser", (req, res) => {
  const { idUser } = req.params;
  const formData = req.body;
  connection.query(
    "UPDATE `user` SET ? WHERE id = ?",
    [formData, idUser],
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// delete one user
router.delete("/:idUser", (req, res) => {
  const { idUser } = req.params;
  connection.query("DELETE FROM user WHERE id = ?", [idUser], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
