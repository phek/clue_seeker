const config = require('../configs/auth');
const jwt = require('jsonwebtoken');
const clientHandler = require('../handlers/ClientHandler');

module.exports = {
    getToken: function (username, password, platform) {
        if (username === 'admin' && password === 'admin') {
            return jwt.sign({username: username, platform: platform, admin: true}, config.secret, {expiresIn: "1d"});
        } else {
            return jwt.sign({username: username, platform: platform, admin: false}, config.secret, {expiresIn: "1d"});
        }
    },
    getClients: function () {
        return clientHandler.clients;
    }
};
