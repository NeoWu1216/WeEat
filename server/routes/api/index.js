const express = require('express');
const router = express.Router();

router.use('/users', require('./api-users'));
router.use('/eatingrooms', require('./api-eatingrooms'));

module.exports = router;
