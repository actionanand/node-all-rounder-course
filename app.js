const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

const {routes: adminRoutes} = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const publicDir = path.join(__dirname, 'public');
const viewPath = path.join(__dirname, './templates/views');

const layoutPath = path.join(__dirname, './templates/layouts');
// const partialsPath = path.join(__dirname, '../templates/partials');

// app.engine('handlebars', exphbs({ layoutsDir: layoutPath })); //file extension should be .handlebars it should match view engine name, if you wish you can take any name for view engine
app.set('view engine', 'ejs');
// app.set('view engine', 'pug');
app.set('views', viewPath);

app.use(express.static(publicDir));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'templates/static/404.html'));
    let url = `localhost:3001${req.url}`;
    // res.status(404).render('404', { title: 'Page Not Found', url, layout: false })
    res.status(404).render('404', { title: 'Page Not Found', url })
});

app.listen(3001, () => {
    console.log('Running at Port 3001');
});