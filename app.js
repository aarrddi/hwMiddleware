require("dotenv").config();
const express = require('express')
const router =require("./routes")

const app = express()
const port = 3000;
const errorHandler = require("./middlewares/errorhandler.js")

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(router);
app.use(errorHandler);


app.listen(3000);