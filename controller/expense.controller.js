const Expense = require("../model/expense.model");

const addExpense = async(req,res)=>{
    try {
        const {description,amount,paidBy,shareWith} = req.body;
        const expense = new Expense({
            description,
            amount,
            paidBy,
            shareWith
        })

        const result = await expense.save();
        return res.status(200).json({
            message:"expense add successfully",
            expense:result
        })
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

module.exports={
    addExpense
}