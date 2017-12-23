const express = require('express');
const router = express.Router();
const authHandler = require('../handlers/AuthHandler');
const api = require('../handlers/ApiHandler');
const MongoClient = require('mongodb').MongoClient;
const config = require('../configs/auth');

const url_DB = config.database;

/* GET routes listing. */
router.get('/', (req, res) => {
    res.send('routes works');
});

router.post('/authenticate', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let platform = req.body.platform;
    let token = api.getToken(username, password, platform);
    return res.status(200).json({token: token});
});

router.get('/sockets', (req, res) => {
    authHandler.auth(req, res, function() {
        res.status(200).json(api.getClients());
    }, true);
});

router.get('/cv/get/experiences', (req, res) => {
    MongoClient.connect(url_DB, (err, db) => {
        if (err) return console.log(err);
        else {
            db.collection('cv.experiences').find().toArray((err, result) => {
                if (err) return res.status(500).send(err);
                else res.status(200).json(result);
            })
        }
        db.close();
    });
});

router.get('/get/posts', (req, res) => {
    MongoClient.connect(url_DB, (err, db) => {
        if (err) return console.log(err);
        else {
            db.collection('posts').find().toArray((err, result) => {
                if (err) return res.status(500).send(err);
                else res.status(200).json(result);
            })
        }
        db.close();
    });
});

module.exports = router;
