var mysql = require('serverless-mysql')();
// secrets = require('./secrets');
// var dotenv = require('dotenv').config();

mysql.config({
    host: 'current-funds.ceg6zn3wrywt.us-east-2.rds.amazonaws.com',
    database: 'currentFunds',
    user: 'admin',
    password: 'yellowjackets',
    port: '3306'
});


export function askAndReceive(q) {
    let results = mysql.query(q);
    return results;
}

// let queryable = new Query();
// queryable.askAndReceive("SELECT * FROM dataTable WHERE id BETWEEN 1 AND 5").then((data) => console.log(data));