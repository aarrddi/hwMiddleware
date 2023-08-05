const express = require('express');
const router = express.Router();
const pool = require("../config/config.js")
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const {generateToken} = require("../lib/jwt.js")


router.post("/register", async (req,res,next)=>{
    try {
    const {email, password, gender, role} = req.body;

    const hashPassword = bcrypt.hashSync(password, salt);

    const insertQuery = 
    `       INSERT INTO users (email, password, gender, role)
            VALUES
                ($1,$2,$3,$4)
    `

    const result = await pool.query(insertQuery, [email, hashPassword, gender, role]) 

    res.status(201).json({
         message: "user created succesfully",
         email,
         gender,
         role
    })
    } catch(err){
        next(err);

    }
})

router.post("/login", async (req,res,next)=>{
    try{
        const {email, password} = req.body;

const findQuery =`
        SELECT * FROM users WHERE email = $1
`

        const result = await pool.query(findQuery,[email]);

       if(result.rows.length === 0){
            throw {name: "ErrorNotFound"}
       } else {
        const foundUser = result.rows[0]
        const isValid = bcrypt.compareSync(password,foundUser.password);
       
       if(isValid){
        const accessToken = generateToken({
            id: foundUser.id,
            email: foundUser.email,
            gender: foundUser.gender,
            role: foundUser.role

        })

        res.status(200).json({
            message:"login succes",
            accessToken
        })
       }else {
        throw {name: "InvalidCredentials"}
       }
    }
       
    }  catch(err){
        next(err);
    } 
})

module.exports = router;