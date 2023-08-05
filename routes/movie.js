const express = require('express');
const router = express.Router();
const pool = require("../config/config.js");


router.get("/", async (req,res,next)=>{
    try{
        const findQuery =`
        SELECT * FROM movies
        `
        const result = await pool.query(findQuery);
    
        res.status(200).json(result.rows);
    
    }catch(err){
        next(err)
    }
})

router.get(":id", async (req,res,next) =>{
    try{
        const {id} = req.params;

        const findQuery =`
        SELECT * FROM users 
        WHERE id = $1
        `
        const result = await pool.query(findQuery,[id])

        if(result.rows.length === 0){
            throw {name: "ErrorNotFound"}
        } else {
            res.status(200).json(result.rows[0])
        }
    } catch(err){
        next(err)
    }
})


module.exports = router;