// import modules
const express = require("express");
const router = express.Router();

// import CRUD
const users = require("./users");
const goals = require("./goals");
const activities = require("./activities");
const foods = require("./foods");
const groups = require("./groups");
const brands = require("./brands");
const auth = require("./authRoutes");
const recipe = require("./recipes");

// init route
router.use("/users", users);
router.use("/goals", goals);
router.use("/activities", activities);
router.use("/foods", foods);
router.use("/groups", groups);
router.use("/brands", brands);
router.use("/auth", auth);
router.use("/recipes", recipe);

// export
module.exports = router;
