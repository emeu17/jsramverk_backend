const database = require("../db/database.js");
const ObjectId = require("mongodb").ObjectId;

const collectionName = "docs";

const data = {
    getAllData: async function (res) {
        let db;

        try {
            db = await database.getDb(collectionName);
            const resultSet = await db.collection.find({}).toArray();

            if (res === undefined) {
                return resultSet;
            }

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

    getUserDocs: async function(res, req) {
        //get email from auth.checkToken
        const email = req.user.email;

        let db;

        try {
            db = await database.getDb(collectionName);

            const findDocs = {
                $or: [
                    {owner: email},
                    {allowed_users: email }
                ]
            };

            const resultSet = await db.collection.find(findDocs).toArray();

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

    //add user to allowed_users
    addAllowedUser: async function (res, req) {
        //update allowed_user field with a new allowed user

        /*example
        db.docs.updateOne(
        {_id: ObjectId("6158e4d2ad5edbc54f4cacd0")},
        {$push: {allowed_users: "abc@123.se"}})
        */

        let db;

        try {
            db = await database.getDb(collectionName);
            const col = await db.collection;

            //find and update first doc
            const filter = { _id: new ObjectId(req.body._id)};

            const updateDoc = {
                $push: {
                    allowed_users: req.user.newUser,
                }
            };

            const result = await col.update(filter, updateDoc);

            console.log(

                `${result.matchedCount} docs matched, updated ${result.modifiedCount} document(s)`,

            );
            // PUT requests should return 204 No Content
            if (result) {
                return res.status(204).json({
                    data: {
                        msg: "Allowed user added"
                    }
                });
                // return  res.status(204).send();
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

    //add user to allowed_users, called from mail function
    addAllowedUserMail: async function (res, req) {
        //update allowed_user field with a new allowed user

        /*example
        db.docs.updateOne(
        {_id: ObjectId("6158e4d2ad5edbc54f4cacd0")},
        {$push: {allowed_users: "abc@123.se"}})
        */
        console.log("inside add user");
        console.log("id: " + req.body._id);
        console.log("user: " + req.body.newUser);

        let db;

        try {
            db = await database.getDb(collectionName);
            const col = await db.collection;

            //find and update first doc
            const filter = { _id: new ObjectId(req.body._id)};

            const updateDoc = {
                $push: {
                    allowed_users: req.body.newUser,
                }
            };

            const result = await col.update(filter, updateDoc);

            console.log(

                `${result.matchedCount} docs matched, updated ${result.modifiedCount} document(s)`,

            );
            // PUT requests should return 204 No Content
            if (result) {
                return true
            }
        } catch (e) {
            return false
        } finally {
            await db.client.close();
        }
    },

    createData: async function (res, req) {
        const email = req.user.email;

        let db;

        try {
            db = await database.getDb(collectionName);
            const col = await db.collection;

            const doc = {
                name: req.body.name,
                content: req.body.content,
                owner: email,
                allowed_users: []
            };

            const result = await col.insertOne(doc);

            if (result) {
                return res.status(201).json({
                    data: {
                        msg: `${result.insertedId}`
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

        console.log("inside updateData");
        console.log("email: " + req.body._id);

        try {
            db = await database.getDb(collectionName);
            const col = await db.collection;

            //find and update first doc
            const filter = { _id: new ObjectId(req.body._id)};

            const updateDoc = {
                $set: {
                    content: req.body.content,
                },
            };

            const result = await col.update(filter, updateDoc);

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
