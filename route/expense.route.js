const express = require('express')
const router = express.Router();
const authToken = require('../middleware/AuthToken');
const { addExpense } = require('../controller/expense.controller');

router.post('/addExpense',authToken,addExpense);


module.exports=router