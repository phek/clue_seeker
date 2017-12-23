const jwt = require('jsonwebtoken');
const config = require('../configs/auth');

module.exports = {
    auth: function (req, res, callback, adminOnly) {
        let token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return res.status(403).send({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    if (adminOnly) {
                        if (decoded.admin) {
                            callback();
                        } else {
                            return res.status(403).send({
                                success: false,
                                message: 'Not admin.'
                            });
                        }
                    } else {
                        callback();
                    }
                }
            });

        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    }
};
