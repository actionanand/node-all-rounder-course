const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use((req, res, next) => {
    res.status(404).send(`<h1>404</h1><h3>localhost:3001${req.url} is not found</h3>`);
});

app.listen(3001, () => {
    console.log('Running at Port 3001');
});