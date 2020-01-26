const http = require('http');

const express = require('express');

const app = express();

const server = http.createServer(app);

server.listen(3001, () => {
    console.log('Running at Port 3001');
});