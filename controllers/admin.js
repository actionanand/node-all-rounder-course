const Product = require('../models/product');

exports.getAddProd = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'templates/static/add-product.html'));
    // res.render('add-product', { title: 'Add Product', formCSS: true, activeProduct: true, path: 'addProduct' });
    res.render('admin/add-product', { title: 'Add Product', path: 'addProduct' });
}

exports.postAddProd = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect('/');
        // this.getProducts();
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', { title: 'Admin Products', products, path: 'adminProduct' });
    });
}