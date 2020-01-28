const path = require('path');

const rootDir = require('../utils/path');

const express = require('express');

const prodCtr = require('../controllers/products');

const router = express.Router();


router.get('/add-product', prodCtr.getAddProd);

router.post('/add-product', prodCtr.postAddProd);

exports.routes = router;

