const express = require("express");
const router = express.Router();
const connection = require("../config");

// get all foods
router.get("/", (req, res) => {
    connection.query("SELECT * FROM food", (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// get one food
router.get("/:idFood", (req, res) => {
    const { idFood } = req.params;
    connection.query(
        "SELECT * FROM food WHERE id = ?",
        [idFood],
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

// create one food
router.post("/", (req, res) => {
    const formData = req.body;
    connection.query("INSERT INTO food SET ?", [formData], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});

// put one ?
router.put("/:idFood", (req, res) => {
    const { idFood } = req.params;
    const formData = req.body;
    connection.query(
        "UPDATE food SET ? WHERE id = ?",
        [formData, idFood],
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
router.delete("/:idFood", (req, res) => {
    const { idFood } = req.params;
    connection.query("DELETE FROM food WHERE id = ?", [idFood], (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;
