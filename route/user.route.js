
const express = require('express');
const bcrypt = require('bcryptjs')
const userRouter = express.Router();

const con = require('../dbConnection/dbCon');

// User signup :
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
                res.status(200).json({'message': 'SignUp Successfully..!'})
            }
            else {
                res.status(200).json({'message': 'Something went wrong..!'})
            }
        }
    })
})

// User SignIn:
userRouter.post('/user/signin', (req, res) => {
    
    let email = req.body.email;
    let dbPass = ''
    let pass = req.body.pass;

    var SQL = `SELECT * FROM user WHERE email='${email}'`;
    
    con.query(SQL, (error, userData) => {
        if (error) {
            res.status(200).json({'message': error.sqlMessage})
        } else {
            if (!userData.length) {
                res.status(200).json({'message': 'Email doesnot exist..!'})
            } else {
                userData.forEach((userInfo) => {
                    dbPass = userInfo.pass;
                    let passMatch = bcrypt.compareSync(pass, dbPass);

                    if (passMatch) {
                        res.status(200).json({'message': 'Successfully SignIn..!'})
                    } else {
                        res.status(200).json({'message': 'Password doesnot match..!'})
                    }
                })
            }
        }
    })
    
})

module.exports = userRouter;
console.log('User Router ready to use..!');