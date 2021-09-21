var express = require('express');
var router = express.Router();
const data = require("../models/data.js");

// Testing routes with method
router.get('/',
    // console.log("Hello inside docs");
    (req, res) => data.getAllData(res, req)
);

//create new document
router.post('/',
    (req, res) => data.createData(res, req)
);

//update document
router.put('/',
    (req, res) => data.updateData(res, req)
);

//not implemented yet
// router.delete("/", (req, res) => {
//     // DELETE requests should return 204 No Content
//     res.status(204).send();
// });

module.exports = router;
