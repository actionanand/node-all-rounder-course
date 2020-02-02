const Product = require('../models/product');

exports.getAddProd = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'templates/static/add-product.html'));
    // res.render('add-product', { title: 'Add Product', formCSS: true, activeProduct: true, path: 'addProduct' });
    res.render('admin/edit-product', { title: 'Add Product', path: 'addProduct', editing: false });
}

exports.getEditProd = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.prodId;
    Product.fetchById(prodId, product => {
        if(!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', { title: 'Edit Product', product, path: '', editing: editMode });
    });
}

exports.postAddProd = (req, res, next) => {
    const title = req.body.title;
    const desc = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    Product.create({
        title,
        price,
        imageUrl,
        description: desc
    }).then(() => {
        console.log('Product created!');
        res.redirect('/admin/products');
    }).catch(err => {
        console.log('Unable to create the product!');
    });
};

exports.postEditProd = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedDesc = req.body.description;
    const updatedImgUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedProd = new Product(prodId, updatedTitle, updatedImgUrl, updatedDesc, updatedPrice);
    updatedProd.save();
    res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', { title: 'Admin Products', products, path: 'adminProduct' });
    });
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
}