const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', { title: 'All Products', products, path: 'products' });
    });
    // res.sendFile(path.join(rootDir, 'templates/static/shop.html'));
    // res.render('shop', { title: 'My Shop', products, hasProduct: products.length > 0, activeShop: true, path: 'shop' });
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', { title: 'Shop', products, path: 'shop' });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', { title: 'Your Cart', path: 'cart'});
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkot', { title: 'Checkout', path: 'checkout'});
}