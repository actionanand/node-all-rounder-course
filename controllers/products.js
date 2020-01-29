const Product = require('../models/product');

exports.getAddProd = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'templates/static/add-product.html'));
    // res.render('add-product', { title: 'Add Product', formCSS: true, activeProduct: true, path: 'addProduct' });
    res.render('add-product', { title: 'Add Product', path: 'addProduct' });
}

exports.postAddProd = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
        // this.getProducts();
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop', { title: 'My Shop', products, path: 'shop' });
    });
    // res.sendFile(path.join(rootDir, 'templates/static/shop.html'));
    // res.render('shop', { title: 'My Shop', products, hasProduct: products.length > 0, activeShop: true, path: 'shop' });
}

