const mongoDB = require('mongodb');

const { getDB } = require('../utils/database');

class Product {
    constructor(title, price, description, imageUrl){
        this.title = title;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    save() {
        const db = getDB();
        return db.collection('products').insertOne(this).then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    }

    static fetchAll() {
        const db = getDB();
        return db.collection('products').find().toArray().then(products => {
            console.log(products);
            return products;
        }).catch(err => console.log(err));
    }

    static findById(prodId) {
        const db = getDB();
        return db.collection('products').find({ _id: mongoDB.ObjectID(prodId) }).next().
        then(product => {
            console.log(product);
            return product;
        }).catch(err => console.log(err));
    }
}


// Model for sql sequelize
// const { DataTypes } = require('sequelize');

// const sequelize = require('../utils/database');
// const Product = sequelize.define('Product', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     price: {
//         type: DataTypes.DOUBLE,
//         allowNull: false
//     },
//     imageUrl: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     description: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// });


module.exports = Product;