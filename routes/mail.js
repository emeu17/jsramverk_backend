var express = require('express');
var router = express.Router();
const mail = require("../models/mail.js");
const auth = require("../models/auth.js");

router.post('/',
    (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => mail.sendMail(res, req)
);

module.exports = router;
