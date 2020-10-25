const express = require("express");
const router = express.Router();
const connection = require("../config");

// get all brand
router.get("/", (req, res) => {
    connection.query("SELECT * FROM `activity`", (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// get one brand
router.get("/:idActivity", (req, res) => {
    const { idActivity } = req.params;
    connection.query(
        "SELECT * FROM `activity` WHERE id = ?",
        [idActivity],
        (err, results) => {
            if (err) {
                res.status(500).send(`message`);
            }
            if (results.length === 0) {
                res.status(404).send(`message`);
            } else {
                res.json(results[0]);
            }
        }
    );
});

// create one brand
router.post("/", (req, res) => {
    const formData = req.body;
    connection.query("INSERT INTO `activity` SET ?", [formData], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});

// edit one brand
router.put("/:idActivity", (req, res) => {
    const { idActivity } = req.params;
    const formData = req.body;
    connection.query(
        "UPDATE `activity` SET ? WHERE id = ?",
        [formData, idActivity],
        (err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.sendStatus(200);
            }
        }
    );
});

// delete one brand
router.delete("/:idActivity", (req, res) => {
    const { idActivity } = req.params;
    connection.query("DELETE FROM `activity` WHERE id = ?", [idActivity], (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;
