const express = require('express');

const mysql = require('mysql');

const con = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'foodlist',
    host: '127.0.0.1'
})

con.connect((error)=>{
    if (error) throw error;
    else{
        console.log('MySQL Database is connected');
    }
})

const cors = require('cors');

const port = 3000;

const app = express();

app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', (req,res)=>{
    res.send (`<h1>Node js + MySQL</h1>`)
})

app.get('/api/foods', (req,res)=>{
    var SQL = 'select * from foods';
    con.query(SQL, (error, result)=>{
        if (error) throw error;
        else{
            res.status(200).json({'info':result});
        }
    })
})
app.listen(port,()=>{
    console.log(`Server is started at ${port}`);
})