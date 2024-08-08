const Expense = require("../model/expense.model");

const addExpense = async(req,res)=>{
    try {
        const {groupId,description,amount,paidBy,shareWith} = req.body;
        const expense = new Expense({
            groupId,
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

const getExpenseByGroupId = async(req,res)=>{
    try {
        const {id} = req.params;
        const expenses = await Expense.find({groupId:id}).populate("shareWith","username").populate("paidBy","username");
        if(!expenses){
            return res.status(404).send({message:"Expense not found"});
        }
        return res.status(200).json({
            success:true,
            message:"Expenses retrived successfully",
            expenses:expenses
        })
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const deleteExpense = async(req,res)=>{
    try {
        const {id} = req.params;
        const expense = await Expense.findByIdAndDelete(id);
        if(!expense){
            return res.status(404).send({message:"Expense not found"})
        }
        return res.status(200).send({message:"expense deleted successfully"})
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports={
    addExpense,
    getExpenseByGroupId,
    deleteExpense
}