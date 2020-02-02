const { Sequelize } = require('sequelize');
// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: process.env.sqlHost,
//     user: process.env.sqlUser,
//     database: process.env.sqlDb,
//     password: process.env.sqlPass
// });
// module.exports = pool.promise();

const sequelize = new Sequelize(process.env.sqlDb, process.env.sqlUser, process.env.sqlPass, {
    dialect: 'mysql',
    host: process.env.sqlHost 
});

module.exports = sequelize;