const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');

const { mongoConnect } = require('./utils/database');
const User = require('./models/user');

// const exphbs = require('express-handlebars');

const app = express();
const port = process.env.PORT

const {routes: adminRoutes} = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorCtr = require('./controllers/error');

const publicDir = path.join(__dirname, 'public');
const viewPath = path.join(__dirname, './templates/views');


// const layoutPath = path.join(__dirname, './templates/layouts');
// const partialsPath = path.join(__dirname, '../templates/partials');

// app.engine('handlebars', exphbs({ layoutsDir: layoutPath })); //file extension should be .handlebars it should match view engine name, if you wish you can take any name for view engine
app.set('view engine', 'ejs');
// app.set('view engine', 'pug');
app.set('views', viewPath);

app.use(express.static(publicDir));
app.use(bodyParser.urlencoded({extended: false}));


app.use((req, res, next) => {
    User.findById('5e4aa93d273772e8c17f5306').then(user => {
        req.user = user;
        next();
    })
    .catch(err => {
        console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorCtr.get404);

mongoConnect(() => {
    console.log('Mongo functioning!');
});

app.listen(port, () => {
    console.log(chalk `{cyan Server is up at Port} {green.bold.underline ${port}}`);
});

//below code for sql connection using sequelize

// const sequelize = require('./utils/database');

// const Product = require('./models/product');
// const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');

// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, {through: CartItem});
// Product.belongsToMany(Cart, {through: CartItem});
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, {through: OrderItem, as: 'products'}); // products is alias for eager loading

// sequelize.authenticate().then(() => {
//     console.log(chalk `{green Database is {bold connected!}}`);
//     // return sequelize.sync({ force: true });
//     return sequelize.sync();
// }).then(() => {
//     console.log(chalk `{green.bold DB & relationship} {cyan are in {underline sync}}`);
//     return User.findByPk(1);
// }).then(user => {
//     if(!user) {
//         return User.create({name: 'Anand Raja', email: 'anand@test@io'});
//     }
//     return user;
// }).then(user => {
//     // console.log(user);
//     return user.createCart();
// }).then(cart => {
//     // console.log(cart);
// })
// .catch(err => {
//     console.log(chalk.bold.red('Error in either connecting to DB or sync!'));
//     console.log(err);
// });
 