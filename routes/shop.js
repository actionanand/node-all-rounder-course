const path = require('path');

const rootDir = require('../utils/path');
const { products } = require('./admin');

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    // console.log(products);
    // res.sendFile(path.join(rootDir, 'templates/static/shop.html'));
    res.render('shop', { title: 'My Shop', products, hasProduct: products.length > 0, activeShop: true, path: 'shop' });
});


module.exports = router;