const config = require('../configs/auth');
const jwt = require('jsonwebtoken');
const clientHandler = require('../handlers/ClientHandler');

module.exports = {
    getToken: function (username, password, platform) {
        if (username === 'test' && password === 'test') {
            return jwt.sign({username: username, platform: platform, admin: true}, config.secret, {expiresIn: "1d"});
        }
        return null;
    },
    getClients: function() {
        return clientHandler.clients;
    }
};
