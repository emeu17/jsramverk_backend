var express = require('express');
var router = express.Router();
const database = require("../db/database.js");

// Testing routes with method
router.get("/", async (req, res) => {
    const db = await database.getDb();
    const col = await db.collection;
    const resultSet = await db.collection.find({}).toArray();
    res.json({
        data: {
            msg: resultSet
        }
    });
});

//create new document
router.post("/", async (req, res) => {
    // let name = req.body.name;
    // let cont = req.body.content;

    // res.status(201).json({
    //     data: {
    //         msg: "Got a POST request, sending back 201 Created for" + name + ", content: " + cont
    //     }
    // });
    
    const db = await database.getDb();
    const col = await db.collection;

    const doc = { name: req.body.name, content: req.body.content };

    const result = await col.insertOne(doc);
    res.status(201).json({
        data: {
            msg: `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
        }
    });
});

//update document
router.put("/", async (req, res) => {
    const db = await database.getDb();
    const col = await db.collection;
    
    //find and update first doc
    const filter = { name: req.body.name };

    const updateDoc = {
        $set: {
        content:
            req.body.content,
        },
    };

    const result = await col.updateOne(filter, updateDoc);

    console.log(

        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,

    );
    // PUT requests should return 204 No Content
    res.status(204).send();
});

//not implemented yet
// router.delete("/", (req, res) => {
//     // DELETE requests should return 204 No Content
//     res.status(204).send();
// });

module.exports = router;
