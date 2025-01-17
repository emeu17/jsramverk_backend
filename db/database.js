const mongo = require("mongodb").MongoClient;
// const config = require("./config.json");
// const collectionName = "docs";


let config;

// if config.json exists, use that.
try {
    config = require('./config.json');
} catch (error) {
    console.error(error);
}

// if environmental variable for username and password exists, use these
// otherwise use config-variables
const dbUname = process.env.DBUNAME || config.username;
const dbPwd = process.env.DBPWD || config.password;


const database = {
    getDb: async function getDb(collectionName) {
        let dsn = "mongodb://localhost:27017/docs";

        if (process.env.NODE_ENV !== 'test') {
            const myDb = "@cluster0.mbjcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

            dsn = `mongodb+srv://${dbUname}:${dbPwd}${myDb}`;
        }

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db();
        const collection = await db.collection(collectionName);

        return {
            db: db,
            collection: collection,
            client: client,
        };
    }
};

module.exports = database;
