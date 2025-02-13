const mysql = require('mysql2');
const config = require('../config/env');

const isProduction = config.deploy === 'deploy';

let db;

function handleDisconnect() {
  db = mysql.createConnection({
    host: !isProduction ? "127.0.0.1" : config.host,
    user: !isProduction ? "root" : config.user,
    password: !isProduction ? "root" : config.password,
    database: !isProduction ? "org" : config.database,
  });

  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      setTimeout(handleDisconnect, 2000); // Retry after 2 seconds
    } else {
      console.log('Connected to MySQL database');
    }
  });

  db.on('error', (err) => {
    console.error('MySQL error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('MySQL connection lost. Reconnecting...');
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = db;