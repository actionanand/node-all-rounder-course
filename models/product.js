const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);


//using mongoDB

// const mongoDB = require('mongodb');

// const { getDB } = require('../utils/database');

// class Product {
//     constructor(title, price, description, imageUrl, id, userId){
//         this.title = title;
//         this.description = description;
//         this.price = price;
//         this.imageUrl = imageUrl;
//         this._id = id;
//         this.userId = userId;
//     }

//     save() {
//         const db = getDB();
//         let dbOp;
//         if(this._id) {
//             console.log('called update');
//             dbOp = db.collection('products').updateOne({ _id: mongoDB.ObjectID(this._id)}, 
//             { $set: {title: this.title, description: this.description, price: this.price, imageUrl: this.imageUrl, userId: this.userId} }); 
//         } else {
//             console.log('called save');
//             dbOp = db.collection('products').insertOne(this);
//         }
//         return dbOp.then(result => {
//             console.log(result);
//         })
//         .catch(err => console.log(err));
//     }

//     static fetchAll() {
//         const db = getDB();
//         return db.collection('products').find().toArray().then(products => {
//             console.log(products);
//             return products;
//         }).catch(err => console.log(err));
//     }

//     static findById(prodId) {
//         const db = getDB();
//         return db.collection('products').find({ _id: mongoDB.ObjectID(prodId) }).next().
//         then(product => {
//             console.log(product);
//             return product;
//         }).catch(err => console.log(err));
//     }

//     static deleteById(prodId) {
//         const db = getDB();
//         return db.collection('products').deleteOne({_id: mongoDB.ObjectID(prodId)}).then(result => {
//             console.log('Product is deleted!');
//         }).catch(err => console.log(err));
//     }
// }




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


// module.exports = Product;