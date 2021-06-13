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

/** user_recipe */
router.get("/:idUser/recipes", async (req, res) => {
  try {
    const {idUser} = req.params
    const sql = "SELECT u.firstname, u.lastname, u.id AS user_id, r.id AS recipe_id, r.name AS recipe_name, r.calories AS recipe_cals\
    FROM user AS u\
    JOIN user_recipe AS ur ON (u.id=ur.user_id)\
    JOIN recipe AS r ON (r.id=ur.recipe_id)\
    WHERE u.id = ? \
    "
    await connection.query(sql, [idUser], async (error, result) => {
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

router.post("/recipes", async (req, res) => {
  try {
    const {userID} = req.params
    const sql = "INSERT INTO `user_recipe` SET ? "
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
