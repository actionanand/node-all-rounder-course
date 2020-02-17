const mongoDB = require('mongodb');

const { getDB } = require('../utils/database');

class User {
    constructor(username, email) {
        this.name = username;
        this.email = email;
    }

    save() {
        const db = getDB();
        return db.collection('users').insertOne();
    }

    static findById(userId) {
        const db = getDB();
        return db.collection('users').findOne({_id: mongoDB.ObjectID(userId)});
    }
}



// using sql

// const { DataTypes } = require('sequelize');

// const sequelize = require('../utils/database');

// const User = sequelize.define('User', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         defaultValue: 'Anonymous'
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     }
// });

module.exports = User;