const generateToken = require("../middleware/generateToken.js");
const User = require("../model/user.model.js");

const signUp = async(req,res)=>{
    try {
        const {username,email,password} = req.body;
        const newUser =new User( {
            username,
            email,
            password
        })

        const user = await newUser.save();
        const token = await generateToken({_id:user._id});
        return res.status(200).json({
            data:user,
            token:token
        });
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email,password}).select('-password');
        if(!user){
            return res.status(400).send({message:"invalid credantials"});
        }
        const token =await generateToken({_id:user._id})
        return res.status(200).json({
            user:user,
            token:token
        });
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports={
    signUp,
    login
}