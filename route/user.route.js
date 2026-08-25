const express = require('express');
const bcrypt = require('bcryptjs')
const userRouter = express.Router();

const con = require('../dbConnection/dbCon');

userRouter.post('/user/signup', (req, res) => {
    
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    const salt = bcrypt.genSaltSync(10);
    let pass = req.body.pass;
    const hashPass = bcrypt.hashSync(pass, salt);

    var SQL = `INSERT INTO user(name, email, phone, pass)
    values('${name}',
            '${email}',
            '${phone}',
            '${hashPass}' 
            )`;
    
    con.query(SQL, (error, result) => {
        if (error) {
            res.status(200).json({'message': error.sqlMessage})
        }
        else {
            if (result.affectedRows == 1) {
                res.status(200).json({'message': 'Successfull..!'})
            }
            else {
                res.status(200).json({'message': 'Something went wrong..!'})
            }
        }
    })
})


module.exports = userRouter;
console.log('User Router ready to use..!')