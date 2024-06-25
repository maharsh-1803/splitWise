const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    description:{
        type:String,
        require:true
    },
    amount:{
        type:Number,
        require:true
    },
    paidBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    shareWith:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    }]
})

const Expense = mongoose.model('Expense',expenseSchema);
module.exports = Expense;