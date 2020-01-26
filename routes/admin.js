const path = require('path');

const rootDir = require('../utils/path');

const express = require('express');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'templates/static/add-product.html'));
    res.render('add-product', { title: 'Add Product', path: 'addProduct' });
});

router.post('/add-product', (req, res, next) => {
    products.push({ title: req.body.title })
    res.redirect('/');
});

exports.routes = router;
exports.products =products;
