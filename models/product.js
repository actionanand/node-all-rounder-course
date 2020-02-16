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
        db.collection('products').insertOne(this).then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
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