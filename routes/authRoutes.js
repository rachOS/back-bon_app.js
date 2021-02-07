const { Router } = require("express");
const router = Router();
const {
  userProfile,
  signup,
  login,
  logout,
} = require("../controllers/authControllers");

router.get("/profile", userProfile);
router.post("/signup", signup);
router.post("/login", login);
router.delete("/logout", logout);

module.exports = router;
