const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', { title: 'All Products', products, path: 'products' });
    });
    // res.sendFile(path.join(rootDir, 'templates/static/shop.html'));
    // res.render('shop', { title: 'My Shop', products, hasProduct: products.length > 0, activeShop: true, path: 'shop' });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.prodId;
    Product.fetchById(prodId, product => {
        res.render('shop/product-detail', { title: 'Product Details' , product, path: 'products' });
    });
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', { title: 'Shop', products, path: 'shop' });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', { title: 'Your Cart', path: 'cart'});
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.prodId;
    Product.fetchById(prodId, (prod) => {
        Cart.addProduct(prodId, prod.price);
    });
    // res.render('/shop/cart', { title: 'Your Cart', path: 'cart'});
    res.redirect('/');
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', { title: 'Your Orders', path: 'orders'});
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkot', { title: 'Checkout', path: 'checkout'});
}