/**
 * Connect to the database and setup it with some default data.
 */
"use strict";

const database = require("../db/database.js");
const fs = require("fs");
const path = require("path");
const docs = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, "setup_docs.json"),
    "utf8"
));

testCreate();

// testUpdate();

async function testCreate() {
    console.log("Test create");
 
    const db = await database.getDb();
    const col = await db.collection;
    
    //remove all in docs, then add all from docs setup.json
    await col.deleteMany();
    await col.insertMany(docs);

    const resultSet = await db.collection.find({}).toArray();
    console.log(resultSet);
    await db.client.close();
}


// async function testUpdate() {
//     console.log("Inside testUpdate");
 
//     const db = await database.getDb();
//     const col = await db.collection;
    
//     //find and update first mumin
//     const filter = { namn: "Eee" };

//     // this option instructs the method to create a document if no documents match the filter

//     // const options = { upsert: true };
//     // then call the function below like this:
//     // const result = await col.updateOne(filter, updateDoc, options);

//     // create a document that sets the plot of the movie

//     const updateDoc = {
//         $set: {
//         bor:
//             "Sundsvall",
//         },
//     };

//     const result = await col.updateOne(filter, updateDoc);

//     console.log(

//         `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,

//     );
//     // await col.updateOne();
//     // await col.insertMany(docs);

//     const resultSet = await db.collection.find({}).toArray();
//     console.log(resultSet);
//     await db.client.close();
// }

