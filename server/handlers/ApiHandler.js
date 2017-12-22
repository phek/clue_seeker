const config = require('../configs/auth');
const jwt = require('jsonwebtoken');

module.exports = {
    getToken: function (username, password, platform) {
        if (username === 'test' && password === 'test') {
            return jwt.sign({username: username, platform: platform}, config.secret, {expiresIn: "1d"});
        }
        return null;
    }
};
