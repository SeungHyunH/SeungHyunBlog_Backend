const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const kakao = require('./kakao');
const google = require('./google');

router.use("/", kakao);
router.use("/", google);


module.exports = router;