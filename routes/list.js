var express = require('express');
var router = express.Router();
const data = require("../models/data.js");

//route /list
//lists all saved documents
router.get('/',
    // console.log("Hello inside docs");
    (req, res) => data.getAllData(res, req)
);

module.exports = router;
