const express = require('express');

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

// Get all foods 
app.get('/api/foods', (req, res) => {
    var SQL = 'SELECT * FROM food';
    con.query(SQL, (error, result) => {
        if (error) throw error
        else {
            res.status(200).json({ 'info': result });
        }
    })
})

// Get foods by ID 
app.get('/api/food/:id', (req, res) => {
    var SQL = `SELECT * FROM food where food_Id=${req.params.id}`

    con.query(SQL, (error, foodInfo) => {
        if (error) throw error;
        else {
            // res.status(200).json({'info': foodInfo})
            if (!foodInfo.length) {
                res.status(200).json({'message': 'No such records found..!'})
            }
            else {
                // res.status(200).json({'info': foodInfo})
                foodInfo.forEach((food) => {
                    res.status(200).json(food);
                })
            }
        }           
    })
})

// Add foods using POST Method
app.post('/api/food', (req, res) => {
    var SQL = `INSERT INTO food(food_name,food_desc, food_price)
    values('${req.body.food_name}', '${req.body.food_desc}', '${req.body.food_price}')`

    con.query(SQL, (error, foodData) => {
        if (error) {
            res.status(200).json({'message': error.sqlMessage})
        } else {
            // res.status(200).json({'info': foodData})
            if (foodData.affectedRows == 1) {
                res.status(200).json({'msg': 'One food Item added successfully..!'})
            }
            else {
                res.status(200).json({'msg': 'Something went wrong..!'})
            }
        }
    })
})

app.listen(port,()=>{
    console.log(`Server is started at ${port}`);
})