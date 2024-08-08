const express = require('express');
const AuthToken = require('../middleware/AuthToken');
const { createGroup, getGroup, getGroupById, getMyGroup, deleteGroup } = require('../controller/group.controller');

const router = express.Router();

router.post('/createGroup',createGroup);
router.get('/getAllGroup',AuthToken,getGroup);
router.get('/getGroupById/:id',AuthToken,getGroupById);
router.get('/getMyGroup',AuthToken,getMyGroup)
router.delete('/deleteGroup/:id',AuthToken,deleteGroup)

module.exports = router;