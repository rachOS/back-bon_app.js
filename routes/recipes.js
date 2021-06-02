const express = require("express");
const router = express.Router();
const connection = require("../config");

// get all foods
router.get("/", (req, res) => {
  connection.query("SELECT * FROM `recipe`", (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// get one food
router.get("/:idRecipe", (req, res) => {
  const { idRecipe } = req.params;
  connection.query(
    "SELECT * FROM `recipe` WHERE id = ?",
    [idRecipe],
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

// create one food
router.post("/", (req, res) => {
  const formData = req.body;
  console.log("formData", formData);
  connection.query("INSERT INTO `recipe` SET ?", [formData], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

// put one ?
router.put("/:idRecipe", (req, res) => {
  const { idRecipe } = req.params;
  const formData = req.body;
  connection.query(
    "UPDATE `recipe` SET ? WHERE id = ?",
    [formData, idRecipe],
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// delete one food
router.delete("/:idRecipe", (req, res) => {
  const { idRecipe } = req.params;
  connection.query("DELETE FROM `recipe` WHERE id = ?", [idRecipe], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
