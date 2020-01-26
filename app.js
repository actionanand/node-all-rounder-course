const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const publicDir = path.join(__dirname, '/views');

// app.use(express.static(publicDir));


app.use(bodyParser.urlencoded({extended: false}));
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3001, () => {
    console.log('Running at Port 3001');
});