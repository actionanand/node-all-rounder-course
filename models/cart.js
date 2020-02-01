const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

const p = path.join(rootDir, 'data/cart.json');

module.exports = class Cart {
    static addProduct(id, prodPrice) {
        fs.readFile(p, (err, data) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(data);
            }
            //Analysing the cart, to find the existing product
            const existingProdInd = cart.products.findIndex(p => p.id === id);
            const existingProd = cart.products[existingProdInd];
            let updatedProd;
            if(existingProd) {
                updatedProd = {...existingProd};
                updatedProd.qty +=  1;
                cart.products = [...cart.products];
                cart.products[existingProdInd] = updatedProd;
            } else {
                updatedProd = { id, qty: 1 };
                cart.products = [...cart.products, updatedProd];
            }
            cart.totalPrice += +prodPrice ;
            fs.writeFile(p, JSON.stringify(cart), (err) =>{
                console.log(err);
            });
        });
    }
    static deleteProd(id, price) {
        fs.readFile(p, (err, data) => {
            if(err) {
                return;
            }
            const updatedCart = {...JSON.parse(data)};
            const prod = updatedCart.products.find(p => p.id === id);
            const prodQty = prod.qty;
            updatedCart.products = updatedCart.products.filter(p => p.id !== id);
            updatedCart.totalPrice -= price*prodQty; 
            fs.writeFile(p, JSON.stringify(updatedCart), (err) =>{
                console.log(err);
            });
        });
    }

    static getCart(cb) {
        fs.readFile(p, (err, data) => {
            const cart = JSON.parse(data);
            if(err) {
                cb(null);
            } else {
                cb(cart);
            }
        });
    }

}
