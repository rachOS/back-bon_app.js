// import modules
const express = require("express");
const router = express.Router();

// import CRUD
const users = require("./users");
const foods = require("./foods");
const brands = require("./brands");

// init route
router.use("/users", users);
router.use("/foods", foods);
router.use("/brands", brands);

// export
module.exports = router;
