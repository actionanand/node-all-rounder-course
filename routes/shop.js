const path = require('path');

const express = require('express');
const prodCtr = require('../controllers/products');
// const rootDir = require('../utils/path');


const router = express.Router();

router.get('/', prodCtr.getProducts);

module.exports = router;