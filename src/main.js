const express = require('express');

// const mysql = require('mysql');

// const con = mysql.createConnection({
//     user: 'root',
//     password: '',
//     database: 'foodlist',
//     host: '127.0.0.1'
// })

// con.connect((error)=>{
//     if (error) throw error;
//     else{
//         console.log('MySQL Database is connected');
//     }
// })

const mysql = require('mysql');

const con = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'fooddb',
    host: '127.0.0.1'
})

con.connect((error) => {
    if (error) throw error
    else {
        console.log('MySQL Database is connected Successfully..!');
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

app.get('/api/foods', (req, res) => {
    var SQL = 'SELECT * FROM food';
    con.query(SQL, (error, result) => {
        if (error) throw error
        else {
            res.status(200).json({ 'info': result });
        }
    })
})

app.get('/api/food/:id', (req, res) => {
    const id = req.params.id;

    const SQL = 'SELECT * FROM food WHERE id = ?';

    con.query(SQL, [id], (error, result) => {
        if (error) {
            return res.status(500).json({
                message: 'Database error'
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: 'Food not found'
            });
        }

        res.status(200).json(result[0]);
    });
});

app.listen(port,()=>{
    console.log(`Server is started at ${port}`);
})