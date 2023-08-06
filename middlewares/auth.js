const {verifyToken} = require("../lib/jwt.js")
const pool = require("../config/config.js")


const authentication = async (req,res,next)=>{
try{

    if(!req.headers.authorization){
        throw {name: "Unauthenticated"}
    }
    const accessToken = req.headers.authorization.split(" ")[1];

    const {id,email,role} = verifyToken(accessToken);
    
    const findQuery = `
        SELECT * FROM users
        WHERE email = $1
    `

    const result = await pool.query(findQuery,[email]);

    if(result.rows.length === 0){
        throw {name: "Unauthenticated"}
    }else{
        const foundUser = result.rows[0]
        req.loggedUser = {
            id: foundUser.id,
            email: foundUser.email,
            role: foundUser.role
        }
        next(); 
    }

}catch(err){
    next(err);
}

}

const authorization = (req,res,next)=>{
    // try{
    //     const {role} = req.loggedUser;
    //     if(role === "engineer"){
    //         next();
    //     }else {
    //         throw {name: "Unauthorized"}
    //     }
    // }catch(err){
    //     next(err);
    // }
}

module.exports = {
    authentication,
    authorization
}