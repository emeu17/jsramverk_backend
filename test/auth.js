/* global it describe before */

process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const HTMLParser = require('node-html-parser');

const server = require('../app.js');

chai.should();

const database = require("../db/database.js");
const collectionName = "users";

chai.use(chaiHttp);

let apiKey = "";

describe('auth', () => {
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

    describe('POST /auth/register', () => {
        it('should get 201', (done) => {
            let user = {
                email: "test@example.com",
                password: "123test",
            };

            chai.request(server)
                .post("/auth/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    // res.body.errors.status.should.be.equal(401);
                    done();
                });
        })
    });


});
