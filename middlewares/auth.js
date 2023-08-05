const {verifyToken} = require("../lib/jwt.js")
const pool = require("../config/config.js")


const authentication = async (req,res,next)=>{
try{
    const accessToken = req.headers.authorization.split(" ")[1];

    console.log(accessToken,"<<<<<<");
}catch(err){
    next(err);
}

}

const authorization = (req,res,next)=>{

}

module.exports = {
    authentication,
    authorization
}