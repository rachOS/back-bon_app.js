const express = require('express');
const router = express.Router();

const foods = require('./foods');

router.use('/foods', foods);

module.exports = router;