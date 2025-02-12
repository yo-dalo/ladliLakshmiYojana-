const mysql = require('mysql2');
const config = require('../config/env');

      const isProduction = config.deploy === 'deploy';



const db = mysql.createConnection({
  host: !isProduction?"127.0.0.1" : config.host ,// Replace with your MySQL host
  user: !isProduction?"root" : config.user  ,  // Replace with your MySQL username
  password:!isProduction?"root" : config.password  ,   // Replace with your MySQL password
  database:!isProduction?"Org" : config.database  ,// Replace with your MySQL database name
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


module.exports = db;