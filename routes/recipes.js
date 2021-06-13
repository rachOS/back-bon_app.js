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

/**foods_recipe */
router.get("/:idRecipe/foods", async (req, res) => {
  try {
    const {idRecipe} = req.params
    const sql = "SELECT *\
    FROM recipe AS r\
    LEFT JOIN food_recipe AS fr ON (r.id=fr.id_recipe)\
    JOIN food AS f ON (f.id=fr.id_food)\
    WHERE r.id = ? \
    "
    await connection.query(sql, [idRecipe], async (error, result) => {
      if (error) {
        return await res.status(500).send(error);
        
     } else {
        return await res.status(200).json(result);
        
     }
        
    })
  } catch (error) {
    await console.error(error);
  }
})
router.post("/foods", async (req, res) => {
  try {
    const sql = "INSERT INTO `food_recipe` SET ? "
    const data =  await req.body
    await connection.query(sql, [data], (error, result) => {

      if (error) {
        return res.status(500).send(error);
      } else {
        return res.status(200).json(result);
      }
  
    })
  } catch (error) {
     console.error(error);
  }
})
module.exports = router;
