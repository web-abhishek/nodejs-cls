const express = require('express');

const mysql = require('mysql');

// db connection code here

const foodRouter = require('../route/food.route')

const cors = require('cors');

const port = 3000;

const app = express();

app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api', foodRouter);

app.get('/', (req,res)=>{
    res.send (`<h1>Node js + MySQL</h1>`)
})

// all http methods code here

app.listen(port,()=>{
    console.log(`Server is started at ${port}`);
})