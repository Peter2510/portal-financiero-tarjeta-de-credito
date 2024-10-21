const express = require('express');
const app = express();
const cors = require('cors');
cookieParser = require('cookie-parser');
//require('./models/asociaciones');
//const { swaggerUi, swaggerDocs } = require('./swagger.js');

//Routes


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.ORIGIN , credentials:true}));

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/',(req,res)=>{
    res.send('Hello from Backend API')
});

//use routes


module.exports = app;