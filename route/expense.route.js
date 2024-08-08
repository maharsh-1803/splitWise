const express = require('express')
const router = express.Router();
const authToken = require('../middleware/AuthToken');
const { addExpense, getExpenseByGroupId, deleteExpense } = require('../controller/expense.controller');

router.post('/addExpense',authToken,addExpense);
router.get('/getExpenseByGroupId/:id',authToken,getExpenseByGroupId)
router.delete('/deleteExpense/:id',authToken,deleteExpense);


module.exports=router