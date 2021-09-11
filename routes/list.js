var express = require('express');
var router = express.Router();
const database = require("../db/database.js");

//route /list
//lists all saved documents
router.get("/", async (req, res) => {
    let db;
    try {
        db = await database.getDb();

        const resultSet = await db.collection.find({}).toArray();

        if (resultSet) {
            return res.json(resultSet);
        }
    } catch (e) {
        return res.status(500).json({
            errors: {
                status: 500,
                source: "/",
                title: "Database error",
                detail: e.message
            }
        });
    } finally {
        await db.client.close();
    }
});

module.exports = router;
