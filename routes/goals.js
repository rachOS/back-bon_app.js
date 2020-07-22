const express = require("express");
const router = express.Router();
const connection = require("../config");

// get all foods
router.get("/", (req, res) => {
    connection.query("SELECT * FROM `goal`", (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// get one user goal
router.get("/:idGoal", (req, res) => {
    const { idGoal } = req.params;
    connection.query(
        "SELECT * FROM `goal` WHERE id = ?",
        [idGoal],
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

// create one user goal
router.post("/", (req, res) => {
    const formData = req.body;
    connection.query("INSERT INTO `goal` SET ?", [formData], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});

// edit one user goal
router.put("/:idGoal", (req, res) => {
    const { idGoal } = req.params;
    const formData = req.body;
    connection.query(
        "UPDATE `goal` SET ? WHERE id = ?",
        [formData, idGoal],
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
router.delete("/:idGoal", (req, res) => {
    const { idGoal } = req.params;
    connection.query("DELETE FROM `goal` WHERE id = ?", [idGoal], (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;
