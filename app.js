const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const {routes: adminRoutes} = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const publicDir = path.join(__dirname, 'public');
const viewPath = path.join(__dirname, './templates/views');
// const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'pug');
app.set('views', viewPath);

app.use(express.static(publicDir));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'templates/static/404.html'));
});

app.listen(3001, () => {
    console.log('Running at Port 3001');
});