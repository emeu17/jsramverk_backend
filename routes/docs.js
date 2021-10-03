var express = require('express');
var router = express.Router();
const data = require("../models/data.js");
const auth = require("../models/auth.js");


router.get('/',
    (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => data.getAllData(res, req)
);

//get documents for a specific user
router.get('/userDocs',
    (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => data.getUserDocs(res, req)
);

//add allowed user to document
router.post('/userDocs',
    (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => data.addAllowedUser(res, req)
);

//create new document
router.post('/',
    (req, res, next) => auth.checkToken(req, res, next),
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
