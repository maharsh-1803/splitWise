const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    groupType:{
        type:String,
        enum:['Home','Trip','Couple','Monthly'],
    }

},{timestamps:true})

const Group = mongoose.model('Group',groupSchema);

module.exports = Group;