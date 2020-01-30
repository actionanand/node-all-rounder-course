const path = require('path');

const express = require('express');
const prodCtr = require('../controllers/shop');
// const rootDir = require('../utils/path');


const router = express.Router();

router.get('/', prodCtr.getProducts);

router.get('/products');

router.get('/cart');

router.get('/checkout');

module.exports = router;