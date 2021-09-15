const mongo = require("mongodb").MongoClient;
// const config = require("./config.json");
const collectionName = "docs";
// const collectionName = "crowd";


let config;

// if config.json exists, use that.
try {
    config = require('./config.json');
} catch (error) {
    console.error(error);
}

// if environmental variable for username and password exists, use these
// otherwise use config-variables
const username = process.env.username || config.username;
const password = process.env.password || config.password;


const database = {
    getDb: async function getDb () {
        // let dsn = `mongodb://localhost:27017/docs`;

        let dsn = "mongodb://localhost:27017/docs";

        if (process.env.NODE_ENV !== 'test') {
            dsn = `mongodb+srv://${username}:${password}@cluster0.mbjcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
        }

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db();
        const collection = await db.collection(collectionName);

        return {
            collection: collection,
            client: client,
        };
    }
};

module.exports = database;
