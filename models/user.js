const mongoDB = require('mongodb');

const { getDB } = require('../utils/database');

class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDB();
        return db.collection('users').insertOne();
    }

    addToCart(product) {

        // const updatedCart = {items: [{prodId: mongoDB.ObjectID(product._id), quantity: 1}]};
        // const db = getDB();
        // return db.collection('users').updateOne({ _id: mongoDB.ObjectID(this._id)}, {$set: {cart: updatedCart}})

        const cartProdInd = this.cart.items.findIndex(cp => {
            return cp.prodId.toString() === product._id.toString();
        });

        let newQntity = 1;
        const updatedCartItems = [...this.cart.items];

        if(cartProdInd >= 0){
            newQntity = this.cart.items[cartProdInd].quantity + 1;
            updatedCartItems[cartProdInd].quantity = newQntity;
        } else {
            updatedCartItems.push({ prodId: mongoDB.ObjectID(product._id), quantity: newQntity });
        }
        const updatedCart = { items: updatedCartItems };
        const db = getDB();
        return db.collection('users').updateOne({ _id: mongoDB.ObjectID(this._id)}, {$set: {cart: updatedCart}});
    }

    getCart() {
        // return this.cart; //return full cart as it is
        const db = getDB();
        const prodIds = this.cart.items.map(i => {
            return i.prodId;
        });

        return db.collection('products').find({ _id: { $in: prodIds } }).toArray()
        .then(products => {
            return products.map(p => {
                return {...p, 
                quantity: this.cart.items.find(i => {
                    return i.prodId.toString() === p._id.toString();
                }).quantity 
                    };
            });
        });
    }

    deleteFromCart(prodId) {
        const updatedCartItems = this.cart.items.filter(i => {
            return i.prodId.toString() !== prodId.toString();
        });

        const updatedCart = { items: updatedCartItems };
        const db = getDB();
        return db.collection('users').updateOne({ _id: mongoDB.ObjectID(this._id)},
        { $set: { cart: updatedCart } });

    }

    addOrder() {
        const db = getDB();
        return this.getCart().then(products => {
            const order = {
                items: products,
                user: {
                    _id: mongoDB.ObjectID(this._id),
                    name: this.name,
                    email: this.email
                }
            }; 
            return db.collection('orders').insertOne(order);
        }).then(result => {
            this.cart = { items: [] };
            return db.collection('users').updateOne({ _id: mongoDB.ObjectID(this._id)},
            { $set: { cart: { items: [] } } });
        });
    }

    static findById(userId) {
        const db = getDB();
        return db.collection('users').findOne({_id: mongoDB.ObjectID(userId)}).then(user => {
            return user;
        }).catch(err => console.log(err));
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