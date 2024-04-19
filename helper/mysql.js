const mysql = require('mysql');
require('dotenv').config(); 

const mysqlConnection = mysql.createPool ({
    host: 'localhost',
    port: "3306",
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'blog',
});

mysqlConnection.getConnection((err, connection) => {   // DB Connection
    if (err) {
      console.log("Database connection error: ", err);
    } else {
      console.log("Database connected");
    }
  });

 module.exports = mysqlConnection;