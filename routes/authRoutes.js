const { Router } = require("express");
const router = Router();
const {
  userSession,
  signup,
  login,
  logout,
} = require("../controllers/authControllers");

router.get("/user-session", userSession);
router.post("/signup", signup);
router.post("/login", login);
router.delete("/logout", logout);

module.exports = router;
