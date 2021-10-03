const express = require('express');
const router = express.Router();
const auth = require("../models/auth.js");

/* ska nog vara i docs, se auth mongo repot,
men ändå kalla på auth.checkToken först */
// router.post('/printdocs',
//     (req, res, next) => auth.checkToken(req, res, next),
//     (req, res) => auth.printData(res, req.body)
// );

router.post('/login', (req, res) => auth.login(res, req.body));
router.post('/register', (req, res) => auth.register(res, req.body));

router.get('/users', (req, res) => auth.users(req, res));

module.exports = router;
