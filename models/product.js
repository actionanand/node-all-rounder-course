const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

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
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProdFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });

    }

    static fetchAll(cb){
     getProdFromFile(cb);   
    }
}