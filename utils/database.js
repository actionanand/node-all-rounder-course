//using mongoDB

// const mongodb = require('mongodb');
// const chalk = require('chalk');

// const MongoClient = mongodb.MongoClient;

// let _db;

// const mongoUser = process.env.mongoUser;
// const mongoPass = process.env.mongoPass;
// const mongoCuster = process.env.mongoCuster;
// const mongoDbName = process.env.mongoDbName;
// const dbUrl = `mongodb+srv://${mongoUser}:${mongoPass}@${mongoCuster}.mongodb.net/${mongoDbName}?retryWrites=true&w=majority`;

// const mongoConnect = callBack => {
//     MongoClient.connect(dbUrl, 
//         { useNewUrlParser: true , useUnifiedTopology: true })
//         .then(client => {
//         console.log(chalk `{green MongoDB is {bold connected!}}`);
//         _db = client.db();
//         callBack();
//     }).catch(err => {
//         console.log(chalk.bold.red('Error in connecting to DB!'));
//         console.log(err);
//     });
// }

// const getDB = () => {
//     if(_db) {
//         return _db;
//     }
//     throw 'No DB is found!';
// }

// module.exports = {
//     mongoConnect,
//     getDB
// };




//using sql

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: process.env.sqlHost,
//     user: process.env.sqlUser,
//     database: process.env.sqlDb,
//     password: process.env.sqlPass
// });
// module.exports = pool.promise(); //exporting as promise

// using sequelize

// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(process.env.sqlDb, process.env.sqlUser, process.env.sqlPass, {
//     dialect: 'mysql',
//     host: process.env.sqlHost 
// });

// module.exports = sequelize;