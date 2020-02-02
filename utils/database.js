const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.sqlHost,
    user: process.env.sqlUser,
    database: process.env.sqlDb,
    password: process.env.sqlPass
});

module.exports = pool.promise();