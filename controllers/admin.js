const Product = require('../models/product');
const chalk = require('chalk');

exports.getAddProd = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'templates/static/add-product.html'));
    // res.render('add-product', { title: 'Add Product', formCSS: true, activeProduct: true, path: 'addProduct' });
    res.render('admin/edit-product', { title: 'Add Product', path: 'addProduct', editing: false });
}

exports.postAddProd = (req, res, next) => {
    const title = req.body.title;
    const desc = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;

    const product = new Product(title, price, desc, imageUrl, prodId);
    product.save()
    .then(() => {
        console.log(chalk.cyan('Product created!'));
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(chalk.cyan('Unable to create the product!'));
        console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then((products) => {
        res.render('admin/products', { title: 'Admin Products', products, path: 'adminProduct' });
    }).catch((err) => {
        console.log(err)
    });
}

exports.getEditProd = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.prodId;
    Product.findById(prodId).then(product => {
        if(!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', { title: 'Edit Product', product, path: '', editing: editMode });
    
    }).catch(err => {
        console.log(err);
    });
}

exports.postEditProd = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedDesc = req.body.description;
    const updatedImgUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;

    const product = new Product(updatedTitle, updatedPrice, updatedDesc, updatedImgUrl, prodId);
    
    product.save()
    .then(() => {
        console.log(chalk.cyan('Product is updated!'));
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    });
}

// using sql

// exports.getEditProd = (req, res, next) => {
//     const editMode = req.query.edit;
//     if(!editMode) {
//         return res.redirect('/');
//     }
//     const prodId = req.params.prodId;
//     Product.findByPk(prodId).then(product => {
//         if(!product) {
//             return res.redirect('/');
//         }
//         res.render('admin/edit-product', { title: 'Edit Product', product, path: '', editing: editMode });
    
//     }).catch(err => {
//         console.log(err);
//     });
// }

// exports.postAddProd = (req, res, next) => {
//     const title = req.body.title;
//     const desc = req.body.description;
//     const price = req.body.price;
//     const imageUrl = req.body.imageUrl;

//     req.user.createProduct({
//         title,
//         price,
//         imageUrl,
//         description: desc
//     })
//     .then(() => {
//         console.log(chalk.cyan('Product created!'));
//         res.redirect('/admin/products');
//     }).catch(err => {
//         console.log(chalk.cyan('Unable to create the product!'));
//         console.log(err);
//     });
// };

// exports.postEditProd = (req, res, next) => {
//     const prodId = req.body.productId;
//     const updatedTitle = req.body.title;
//     const updatedDesc = req.body.description;
//     const updatedImgUrl = req.body.imageUrl;
//     const updatedPrice = req.body.price;

//     req.user.getProducts({where: {id: prodId}})
//     .then(products => {
//         const product = products[0];
//         product.title = updatedTitle;
//         product.description = updatedDesc;
//         product.imageUrl = updatedImgUrl;
//         product.price = updatedPrice;
//         return product.save();
//     }).then(() => {
//         console.log(chalk.cyan('Product is updated!'));
//         res.redirect('/admin/products');
//     })
//     .catch(err => {
//         console.log(err);
//     });
// }

// exports.getProducts = (req, res, next) => {
//     req.user.getProducts()
//     .then((products) => {
//         res.render('admin/products', { title: 'Admin Products', products, path: 'adminProduct' });
//     }).catch((err) => {
//         console.log(err)
//     });
// }

// exports.postDeleteProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     Product.findByPk(prodId).then(product => {
//         return product.destroy();
//     }).then(() => {
//         console.log(chalk.cyan('Product has been deleted'));
//         res.redirect('/admin/products');
//     }).catch(err => {
//         console.log(err);
//     });
// }