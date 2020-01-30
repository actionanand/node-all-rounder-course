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
    constructor(t) {
        this.title = t;
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