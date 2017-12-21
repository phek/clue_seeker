const clientHandler = require('./ClientHandler');
const config = require('../configs/auth');
const jwt = require('jsonwebtoken');

module.exports = {
    listen: function (io) {
        io.on('connection', function (socket) {
            console.log('Socket connected');

            clientHandler.add({
                socket_id: socket.id,
                username: null,
                token: null,
                platform: "unknown"
            });

            socket.on('disconnect', function () {
                clientHandler.remove(socket.id);
                console.log("Socket disconnected");
            });

            socket.on('auth', function (token) {
                jwt.verify(token, config.secret, function (err, decoded) {
                    if (decoded) {
                        clientHandler.auth(socket.id, token, decoded.username, decoded.platform);
                    } else {
                        console.log("Failed to auth");
                    }
                });
            });

            socket.on('chat message', function (msg) {
                let combinedMsg = socket.id.substring(0, 4) + ': ' + msg;
                io.emit('chat message', combinedMsg);
                console.log('multicast: ' + combinedMsg);
            });
        });
    }
};
