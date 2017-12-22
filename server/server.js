const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const bodyParser = require('body-parser');
const api = require('./routes/api');
const routes = require('./routes/other');
const socket = require('./handlers/SocketHandler');
const io = require('socket.io')(http, {
    pingInterval: 10000,
    pingTimeout: 5000
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);
app.use('', routes);

socket.listen(io);

http.listen(3000, function () {
    console.log('listening on *:3000');
});
