const express = require('express');
const router = express.Router();
const pool = require("../config/config.js");
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const {authorization} = require("../middlewares/auth.js");


router.get("/", async (req,res,next)=>{
    try{
        // paggination 
        let {page,limit} = req.query

        const findQuery =`
        SELECT * FROM movies
        LIMIT $1 OFFSET $2
        `

        page = +page || DEFAULT_PAGE;
        limit = +limit || DEFAULT_LIMIT;
        let itemPerPage = (page - 1) * limit;

        const result = await pool.query(findQuery, [limit, itemPerPage]);
    
        res.status(200).json(result.rows);
    
    }catch(err){
        next(err)
    }
})

router.get("/:id", async (req,res,next) =>{
    try{
        const {id} = req.params;

        const findQuery =`
        SELECT * FROM movies 
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

router.get("/:id", async(req,res,next) =>{
    try{
        const {id} = req.params;

        findQuery = `
        SELECT * FROM movies
        WHERE id = $1`

        const result = await pool.query(findQuery,[id])

        if(result.rows.length === 0){
            throw{name: "ErrorNotFound"}
        }else{
        res.status(200).json(result.rows[0])
        }
    }catch(err){
        next();
    }
})

router.post("/",async(req,res,next)=>{
    try{
        const {title,genres,year} = req.body;
        const insertQuery = `
        INSERT INTO movies(title,genres,year)
        VALUES ($1, $2, $3)`

        const result = await pool.query(insertQuery, [title,genres,year]);

        res.status(201).json({message: "Movie Succesfully Added"})
    }catch(err){
        next(err);
    }
})

router.put("/:id",async(req,res,next)=>{
    try{
        const{title} = req.body;
        const{id} = req.params;

        const updateQuery = `
            UPDATE movies
            SET title = $1
            WHERE id = $2
            RETURNING * 
        `
        const result = await pool.query(updateQuery,[title,id]);

        if(result.rows.length === 0){
            throw{name:"ErrorNotFound"}
        }else{
    res.status(200).json({name: "Movie Update Successfully"});
        }
    }catch(err){
        next(err);
    }
})


router.delete("/:id", async (req,res,next)=>{
    try{
        const {id} = req.params;
        const deleteQueries = `
            DELETE FROM movies
            WHERE id = $1
            RETURNING *
        `

        const result = await pool.query(deleteQueries,[id]);
        if(result.rows.length === 0){
            throw{name:"ErrorNotFound"}
        }else{
    res.status(200).json({name: "Movie Deleted Successfully"});
        }

    }catch(err){
        next(err)
    }
})


module.exports = router;