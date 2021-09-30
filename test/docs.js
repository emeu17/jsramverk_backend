process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

const database = require("../db/database.js");
const collectionName = "docs";

chai.use(chaiHttp);

describe('docs', () => {
    before(() => {
        return new Promise(async (resolve) => {
            const db = await database.getDb(collectionName);

            db.db.listCollections(
                { name: collectionName }
            )
                .next()
                .then(async function(info) {
                    if (info) {
                        await db.collection.drop();
                    }
                })
                .catch(function(err) {
                    console.error(err);
                })
                .finally(async function() {
                    await db.client.close();
                    resolve();
                });
        });
    });
    describe('GET /docs', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/docs")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    // res.body.length.should.be.above(0);
                    done();
                });
        });
    });

    describe('POST /docs', () => {
        it('201 HAPPY PATH', (done) => {
            const data = {
                name: "Test new document",
                content: "Testing 123 content"
            };

            chai.request(server)
                .post("/docs")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    // console.log(res.body.data);
                    // console.log(typeof res.body.data.msg);
                    res.body.data.msg.should.be.an("string");
                    done();
                });
        });
    });

    describe('PUT /docs', () => {
        it('204 HAPPY PATH', (done) => {
            const data = {
                name: "Test new document",
                content: "Testing 123 NEW content"
            };

            chai.request(server)
                .put("/docs")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(204);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });
});
