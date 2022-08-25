const users = require('./user');
const express = require('express');
const router = express.Router();

router.use("/user", users);

const posts = require('./post');
router.use("/post",posts);

module.exports = router;