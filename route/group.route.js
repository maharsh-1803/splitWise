const express = require('express');
const AuthToken = require('../middleware/AuthToken');
const { createGroup, getGroup, getGroupById, getMyGroup } = require('../controller/group.controller');

const router = express.Router();

router.post('/createGroup',createGroup);
router.get('/getAllGroup',AuthToken,getGroup);
router.get('/getGroupById/:id',AuthToken,getGroupById);
router.get('/getMyGroup',AuthToken,getMyGroup)

module.exports = router;