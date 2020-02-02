const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.findAll().then((products) => {
        res.render('shop/product-list', { title: 'All Products', products, path: 'products' });
    }).catch(err => {
        console.log(err);
    });
    // res.sendFile(path.join(rootDir, 'templates/static/shop.html'));
    // res.render('shop', { title: 'My Shop', products, hasProduct: products.length > 0, activeShop: true, path: 'shop' });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.prodId;
    Product.fetchById(prodId).then(([product, fieldData]) => {
        res.render('shop/product-detail', { title: 'Product Details' , product: product[0], path: 'products' });
    }).catch(err => {
        console.log(err);
    });
}

exports.getIndex = (req, res, next) => {
    Product.findAll().then((products) => {
        res.render('shop/index', { title: 'Shop', products, path: 'shop' });
    }).catch(err => {
        console.log(err);
    });
}

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProd = [];
            for(product of products) {
                const foundProdInCart = cart.products.find(p => product.id === p.id);
                if(foundProdInCart) {
                    cartProd.push({product, qty: foundProdInCart.qty});
                }
            }
            res.render('shop/cart', { title: 'Your Cart', path: 'cart', cartProd });
        });
    });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.prodId;
    Product.fetchById(prodId, (prod) => {
        Cart.addProduct(prodId, prod.price);
    });
    // res.render('/shop/cart', { title: 'Your Cart', path: 'cart'});
    res.redirect('/');
}

exports.postDeleteCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    Product.fetchById(prodId, product => {
        Cart.deleteProd(prodId, product.price);
        res.redirect('/cart');
    });
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', { title: 'Your Orders', path: 'orders'});
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkot', { title: 'Checkout', path: 'checkout'});
}