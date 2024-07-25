const express = require('express');
const { signUp, login, displayAllUser } = require('../controller/user.controller');

const router = express.Router();

router.post('/signUp',signUp);
router.post('/login',login)
router.get('/getAllUser',displayAllUser)

module.exports = router;