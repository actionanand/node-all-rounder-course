const path = require('path');

const rootDir = require('../utils/path');

const express = require('express');

// const shopCtr = require('../controllers/shop');
const adminCtr = require('../controllers/admin');

const router = express.Router();


// router.get('/add-product', adminCtr.getAddProd);

// router.get('/products', adminCtr.getProducts);

// router.post('/add-product', adminCtr.postAddProd);

// router.get('/edit-product/:prodId', adminCtr.getEditProd);

// router.post('/edit-product', adminCtr.postEditProd);

// router.post('/delete-product', adminCtr.postDeleteProduct);

exports.routes = router;

