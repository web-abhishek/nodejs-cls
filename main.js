const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const port = 3000;
const app = express();
app.use(cors());

// Let express to accepts incoming data
app.use(express.urlencoded({extended: true}));  //for web client
app.use(express.json());                        //for mobile client

app.get('/', (req,res)=>{
    res.send(`<h1>Node js + MySQL</h1>`);
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
