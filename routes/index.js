const express = require ('express');
const router = express.Router();
const authRouter = require ("./auth.js");
const movieRouter = require("./movie.js")
const {authentication} = require("../middlewares/auth.js")


router.use("/auth",authRouter);
router.use(authentication)
//yg kena authentication hanya setelah ini
router.use("/movie",movieRouter);

module.exports = router;