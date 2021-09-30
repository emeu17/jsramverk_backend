const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

let config;

try {
    config = require('../config/config.json');
} catch (error) {
    console.error(error);
}

const auth = require("../models/auth.js");

const secret = process.env.JWT_SECRET || config.secret;


// router.get('/register', (req, res) => {
//     console.log("res:" + res.body);
//     console.log("req:" + req.body);
//     res.json("hello!");
// });

/* ska nog vara i docs, se auth mongo repot,
men ändå kalla på auth.checkToken först */
router.post('/printdocs',
    (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => auth.printData(res, req.body)
);

router.post('/login', (req, res) => auth.login(res, req.body));
router.post('/register', (req, res) => auth.register(res, req.body));


module.exports = router;
