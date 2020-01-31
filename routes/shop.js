const path = require('path');

const express = require('express');
const prodCtr = require('../controllers/shop');
// const rootDir = require('../utils/path');


const router = express.Router();

router.get('/', prodCtr.getIndex);

router.get('/products', prodCtr.getProducts);

router.get('/cart', prodCtr.getCart);

router.get('/checkout', prodCtr.getCheckout);

module.exports = router;