var express = require('express');
var router = express.Router();
// var cors = require('cors');
const pdf = require("../models/pdf.js");
const auth = require("../models/auth.js");
const pdfMaker = require('html-pdf');
// var corsOptions = {
//     origin: "http://www.student.bth.se",
//     // origin: "http://127.0.0.1:3000",
//     methods: ["POST"]
// }
// cors(corsOptions),


router.post('/create',
    // (req, res, next) => pdf.setOrigin(req, res, next),
    (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => pdf.createPdf(req, res)
);


router.post('/test2', function(req, res) {
    console.log(req.body.html);
    const html = req.body.html;

    pdfMaker.create(html).toBuffer(function(err, buffer) {
        // console.log(buffer);
        // console.log('This is a buffer:', Buffer.isBuffer(buffer));
        // console.log(buffer);
        res.send(buffer);
    });
});

router.post('/test3', function(req, res) {
    console.log(req.body.html);
    const html = req.body.html;

    pdfMaker.create(html).toStream(function(err, stream){
        res.send(stream);
    });
});



router.post('/test1', function(req, res) {
    console.log("html: " + req.body.html);

    res.send("hello email " + req.body.html);
});

router.get('/', function(req, res) {
    const data = {
        data: {
            msg: "API for creating pdf!!!"
        }
    };

    res.json(data);
});

module.exports = router;
