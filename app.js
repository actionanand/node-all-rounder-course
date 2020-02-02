const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
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
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorCtr.get404);

app.listen(port, () => {
    console.log(`Running at Port ${port}`);
});