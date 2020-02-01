const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');
const Cart = require('./cart');

const p = path.join(rootDir, 'data/products.json');

const getProdFromFile = (cb) => {
    fs.readFile(p, (err, data) => {
        if(err) {
            return cb([])
        }
        cb(JSON.parse(data));
    });
}

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProdFromFile(products => {
            if(this.id){
                const existingProdInd = products.findIndex(p => p.id === this.id);
                const updatedProd = [...products];
                updatedProd[existingProdInd] = this;
                fs.writeFile(p, JSON.stringify(updatedProd), (err) => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });

    }

    static fetchAll(cb){
     getProdFromFile(cb);   
    }

    static fetchById(id, cb) {
        getProdFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }

    static deleteById(id) {
        getProdFromFile(products => {
            const product = products.find(p => p.id === id);
            const filteredProd = products.filter(p => p.id !== id);
            fs.writeFile(p, JSON.stringify(filteredProd), err => {
                if(!err) {
                    Cart.deleteProd(id, product.price);
                }
            });
        });
    }
}