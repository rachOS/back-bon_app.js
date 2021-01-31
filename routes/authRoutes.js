const { Router } = require("express");
const router = Router();
const {
  userProfil,
  signup,
  login,
  logout,
} = require("../controllers/authControllers");

router.get("/profil", userProfil);
router.post("/signup", signup);
router.post("/login", login);
router.delete("/logout", logout);

module.exports = router;
