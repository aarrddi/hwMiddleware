const express = require ('express');
const router = express.Router();
const authRouter = require ("./auth.js");
const movieRouter = require("./movie.js")
const {authentication} = require("../middlewares/auth.js");


// const swaggerJSDoc = require('swagger-jsdoc');
// swaggerJSDoc = require('swagger-jsdoc');
// swaggerUI = require('swagger-ui-express');

// const options = {
//     definition:{
//         openapi: '3.3.0',
//         info: {
//             title: 'Express API with Swagger',
//             version: '0.1.0',
//             description: 
//             'this is a simple curd '
//         },
//         server: [
//             {
//                 url:'http://localhost:3000',
//             },
//         ],
//     },
//     apis:['./routes/*.js'],
// };

// const specs = swaggerJSDoc(options);
// app.use(
//     '/api-docs',
//     swaggerUI.serve,
//     swaggerUI.setup(specs,{explorer: true})

// );




router.use("/auth",authRouter);
router.use(authentication);
//yg kena authentication hanya setelah ini
router.use("/movie",movieRouter);

module.exports = router;