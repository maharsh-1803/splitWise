const jwt = require('jsonwebtoken')

const AuthToken = async(req,res,next)=>{
    const token = req.headers['authorization'];

    if(!token)
    {
        return req.status(500).send({message:"Token not provided"})
    }

    jwt.verify(token,process.env.SECRECT_KEY,(err,decoded)=>{
        if(err)
        {
            return res.status(500).json({message:"faild to verify token"})
        }

        req.user = decoded;
        next();
    })
}

module.exports = AuthToken;