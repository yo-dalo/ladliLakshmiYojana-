const mysql = require('mysql2');
const config = require('../config/env');
const pool = mysql.createPool({
  host: config.host, // Replace with your MySQL host
  user: config.user,      // Replace with your MySQL username
  password: config.password,      // Replace with your MySQL password
  database: config.database,  
  connectionLimit: 10,
});

module.exports = pool;