const Product = require('../models/product');


exports.getIndex = (req, res, next) => {
    Product.fetchAll().then((products) => {
        res.render('shop/index', { title: 'Shop', products, path: 'shop' });
    }).catch(err => {
        console.log(err);
    });
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll().then((products) => {
        res.render('shop/product-list', { title: 'All Products', products, path: 'products' });
    }).catch(err => {
        console.log(err);
    });
}

//using SQL

// exports.getProducts = (req, res, next) => {
//     Product.findAll().then((products) => {
//         res.render('shop/product-list', { title: 'All Products', products, path: 'products' });
//     }).catch(err => {
//         console.log(err);
//     });
//     // res.sendFile(path.join(rootDir, 'templates/static/shop.html'));
//     // res.render('shop', { title: 'My Shop', products, hasProduct: products.length > 0, activeShop: true, path: 'shop' });
// }

// exports.getProduct = (req, res, next) => {
//     const prodId = req.params.prodId;
//     Product.findByPk(prodId).then(product => {
//         res.render('shop/product-detail', { title: 'Product Details' , product, path: 'products' });
//     }).catch(err => {
//         console.log(err);
//     });
// }

// exports.getIndex = (req, res, next) => {
//     Product.findAll().then((products) => {
//         res.render('shop/index', { title: 'Shop', products, path: 'shop' });
//     }).catch(err => {
//         console.log(err);
//     });
// }

// exports.getCart = (req, res, next) => {
//     req.user.getCart().then(cart => {
//         return cart.getProducts();
//     }).then(cartProd => {
//         res.render('shop/cart', { title: 'Your Cart', path: 'cart', cartProd });
//     })
//     .catch(err => {
//         console.log(err);
//     });
// }

// exports.postCart = (req, res, next) => {
//     const prodId = req.body.prodId;
//     let fetchedCart;
//     let newQuantity = 1;
//     req.user.getCart().then(cart => {
//         fetchedCart = cart;
//         return cart.getProducts({where: {id: prodId}});
//     }).then(products => {
//         let product;
//         if(products.length > 0){
//             product = products[0];
//         }
        
//         if(product) {
//             const oldQntity = product.CartItem.quantity;
//             newQuantity = oldQntity + 1;
//             return product;
//         }
//         return Product.findByPk(prodId);
//     })
//     .then(product => {
//         return fetchedCart.addProduct(product, {through: {quantity: newQuantity}});
//     })
//     .then(() => {
//         res.redirect('/cart');
//     })
//     .catch(err => console.log(err));
// }

// exports.postDeleteCartItem = (req, res, next) => {
//     const prodId = req.body.productId;
//     req.user.getCart().then(cart => {
//         return cart.getProducts({where: {id: prodId}});
//     })
//     .then(products => {
//         const product = products[0];
//         return product.CartItem.destroy();
//     }).then(result => {
//         res.redirect('/cart');
//     })
//     .catch(err => console.log(err));
// }

// exports.postOrder = (req, res, next) => {
//     let fetchedCart;
//     req.user.getCart().then(cart => {
//         fetchedCart = cart;
//         return cart.getProducts()
//     }).then(products => {
//         return req.user.createOrder().then(order => {
//             return order.addProducts(
//                 products.map(product => {
//                     product.OrderItem = {quantity: product.CartItem.quantity};
//                     return product;
//                 })
//             );
//         }).then(result => {
//             return fetchedCart.setProducts(null);
//         }).then(result => {
//             res.redirect('/orders');
//         }).catch(err => console.log(err));
//     }).catch(err => console.log(err));
// }

// exports.getOrders = (req, res, next) => {
//     req.user.getOrders({include: ['products']}) //eager loading of products while fetching, so it'll be available for display in order page
//     .then(orders => {
//         res.render('shop/orders', { title: 'Your Orders', path: 'orders', orders});
//     }).catch(err => console.log(err));
// }

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkot', { title: 'Checkout', path: 'checkout'});
}