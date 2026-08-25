const express = require('express');

const foodRouter = express.Router();

const con = require('../dbConnection/dbCon');

// Get all foods
foodRouter.get('/foods', (req,res) => {
    var SQL = `SELECT * FROM food`;

    con.query(SQL, (error, result) => {
        if (error) {
            res.status(200).json({'message': error.sqlMessage})
        }
        else {
            res.status(200).json(result)
        }
    })
})

// Get foods by ID
foodRouter.get('/food/:id', (req, res) => {
    var SQL = `SELECT * FROM food
                 where food_id=${req.params.id}`;
    
    con.query(SQL, (error, foodInfo) => {
        if (error) {
            res.status(200).json({ 'message': error.sqlMessage })
        } else {
            if (!foodInfo.length) {
                res.status(200).json({'message': 'No such record found..!'})                
            }
            else {
                foodInfo.forEach((foods) => {
                    res.status(200).json(foods)
                })
            }
        }
    })
})


// Add foods using POST Method
foodRouter.post('/food', (req, res) => {
    var SQL = `INSERT INTO food(food_name, food_desc, food_price)
    values('${req.body.food_name}', '${req.body.food_desc}', '${req.body.food_price}')`

    con.query(SQL, (error, foodData) => {
        if (error) {
            res.status(200).json({'message': error.sqlMessage})
        } else {
            // res.status(200).json({ 'Info': foodData })
            if (foodData.affectedRows == 1) {
                res.status(200).json({'message': 'One food item added successfully..!'})
            }
            else {
                res.status(200).json({ 'message': 'Something went wrong..!' })
            }
        }
    })
})

// Delete food item
foodRouter.delete('/food/:id', (req, res) => {
    var SQL = `DELETE FROM food
                where 
                food_id=${req.params.id}`;
    
    con.query(SQL, (error, result) => {
        if (error) {
            res.status(200).json({'message': error.sqlMessage})
        } else {
            if (result.affectedRows == 1) {
                res.status(200).json({'message': 'One item deleted successfully..!'})
            } else {
                res.status(200).json({'message': 'Something went wrong..!'})
            }
        }
    })
})

// Update food items
foodRouter.all('/food/:id', (req, res) => {
    if ( req.method == 'PUT' || req.method == 'PATCH') {
        var SQL = `UPDATE food 
                    set
                    food_name = '${req.body.food_name}',
                    food_desc = '${req.body.food_desc}',
                    food_price = '${req.body.food_price}'
                    where
                    food_id = '${req.params.id}'
                    `
        con.query(SQL, (error, result) => {
            if (error) {
                res.status(200).json({'message': error.sqlMessage})
            }
            else {
                // res.status(200).json(result)
                if (result.affectedRows == 1) {
                    res.status(200).json({'message': 'Food item update successfully..!'})
                }
                else {
                    res.status(200).json({'message': 'Something went wrong..!'})
                }
            }
        })
    }
    else {
        res.status(200).json({'message': `${req.method} method doesn't support..!`})
    }
})


module.exports = foodRouter;
console.log('Food Router is ready to use..!')