const express = require("express");
const router = express.Router();
const connection = require("../config");

// get all brand
router.get("/", (req, res) => {
    connection.query("SELECT * FROM `brand`", (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// get one brand
router.get("/:idBrand", (req, res) => {
    const { idBrand } = req.params;
    connection.query(
        "SELECT * FROM `brand` WHERE id = ?",
        [idBrand],
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
    connection.query("INSERT INTO `brand` SET ?", [formData], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});

// edit one brand
router.put("/:idBrand", (req, res) => {
    const { idBrand } = req.params;
    const formData = req.body;
    connection.query(
        "UPDATE `brand` SET ? WHERE id = ?",
        [formData, idBrand],
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
router.delete("/:idBrand", (req, res) => {
    const { idBrand } = req.params;
    connection.query("DELETE FROM `brand` WHERE id = ?", [idBrand], (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;
