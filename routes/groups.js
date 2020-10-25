const express = require("express");
const router = express.Router();
const connection = require("../config");

// get all food groups
router.get("/", (req, res) => {
    connection.query("SELECT * FROM `group`", (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// get one food group
router.get("/:idGroup", (req, res) => {
    const { idGroup } = req.params;
    connection.query(
        "SELECT * FROM `group` WHERE id = ?",
        [idGroup],
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

// create one food group
router.post("/", (req, res) => {
    const formData = req.body;
    connection.query("INSERT INTO `group` SET ?", [formData], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});

// edit one food group
router.put("/:idGroup", (req, res) => {
    const { idGroup } = req.params;
    const formData = req.body;
    connection.query(
        "UPDATE `group` SET ? WHERE id = ?",
        [formData, idGroup],
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
router.delete("/:idGroup", (req, res) => {
    const { idGroup } = req.params;
    connection.query("DELETE FROM `group` WHERE id = ?", [idGroup], (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;
