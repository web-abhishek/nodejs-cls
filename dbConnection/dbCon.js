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

module.exports = con;
console.log('Global database connected successfully..!')