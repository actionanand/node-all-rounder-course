const path = require('path');

const express = require('express');
const prodCtr = require('../controllers/shop');
// const rootDir = require('../utils/path');


const router = express.Router();

router.get('/', prodCtr.getIndex);

router.get('/products', prodCtr.getProducts);

router.get('/products/:prodId', prodCtr.getProduct);

router.get('/cart', prodCtr.getCart);

router.post('/cart', prodCtr.postCart);

router.post('/cart-delete-item', prodCtr.postDeleteCartItem);

router.post('/create-order', prodCtr.postOrder);

router.get('/orders', prodCtr.getOrders);

// router.get('/checkout', prodCtr.getCheckout);

module.exports = router;