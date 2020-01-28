const products = [];

exports.getAddProd = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'templates/static/add-product.html'));
    // res.render('add-product', { title: 'Add Product', formCSS: true, activeProduct: true, path: 'addProduct' });
    res.render('add-product', { title: 'Add Product', path: 'addProduct' });
}

exports.postAddProd = (req, res, next) => {
    products.push({ title: req.body.title })
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'templates/static/shop.html'));
    // res.render('shop', { title: 'My Shop', products, hasProduct: products.length > 0, activeShop: true, path: 'shop' });
    res.render('shop', { title: 'My Shop', products, path: 'shop' });
}