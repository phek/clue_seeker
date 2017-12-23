const clientHandler = require('./ClientHandler');
const api = require('../handlers/ApiHandler');
const config = require('../configs/auth');
const jwt = require('jsonwebtoken');

module.exports = {
    listen: function (io) {
        io.use(function (socket, next) {
            if (socket.handshake.query) {
                let username = socket.handshake.query.username;
                let password = socket.handshake.query.password;
                let platform = socket.handshake.query.platform;
                let token = socket.handshake.query.token;
                if (username && password && platform) {
                    token = api.getToken(username, password, platform);
                    socket.emit('token', token);
                }
                if (token) {
                    jwt.verify(token, config.secret, function (err, decoded) {
                        if (err) {
                            console.log("Invalid token");
                        } else {
                            socket.decoded = decoded;
                            next();
                        }
                    });
                } else {
                    console.log("No token")
                }
            } else {
                console.log("Invalid authentication");
            }
        });

        io.on('connection', function (socket) {
            console.log('Socket connected');
            clientHandler.add({
                socket_id: socket.id,
                username: socket.decoded.username,
                platform: socket.decoded.platform,
                admin: socket.decoded.admin
            });

            socket.on('disconnect', function () {
                clientHandler.remove(socket.id);
                console.log("Socket disconnected");
            });

            socket.on('alert', function (msg) {
                io.emit('alert', msg);
            });

            socket.on('chat message', function (msg) {
                let combinedMsg = socket.id.substring(0, 4) + ': ' + msg;
                io.emit('chat message', combinedMsg);
                console.log('multicast: ' + combinedMsg);
            });
        });
    }
};
