const database = require("../db/database.js");

const data = {
    getAllData: async function (res) {
        let db;

        try {
            db = await database.getDb();
            const resultSet = await db.collection.find({}).toArray();

            // res.json({
            //     data: {
            //         msg: resultSet
            //     }
            // });
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
    },

    createData: async function (res, req) {
        let db;

        try {
            db = await database.getDb();
            const col = await db.collection;

            const doc = { name: req.body.name, content: req.body.content };

            const result = await col.insertOne(doc);

            if (result) {
                return res.status(201).json({
                    data: {
                        msg: `${result.insertedCount} docs inserted with _id: ${result.insertedId}`
                    }
                });
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
    },

    updateData: async function (res, req) {
        let db;

        try {
            db = await database.getDb();
            const col = await db.collection;

            //find and update first doc
            const filter = { name: req.body.name };

            const updateDoc = {
                $set: {
                    content: req.body.content,
                },
            };

            const result = await col.updateOne(filter, updateDoc);

            // console.log("id: " + filter._id);
            console.log(

                `${result.matchedCount} docs matched, updated ${result.modifiedCount} document(s)`,

            );
            // PUT requests should return 204 No Content
            if (result) {
                return  res.status(204).send();
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
    }
};

module.exports = data;
