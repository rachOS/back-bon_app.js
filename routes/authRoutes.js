const { Router } = require("express");
const router = Router();
const authControllers = require("../controllers/authControllers");

router.post("/signup", authControllers.new_user);
router.post("/login", authControllers.auth_user);
router.get("/logout", authControllers.logout_user);

module.exports = router;
