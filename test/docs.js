process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

const database = require("../db/database.js");
const collectionName = "docs";

chai.use(chaiHttp);

let token = "";

describe('docs', () => {
    before(() => {
        // let user = {
        //     email: "test@test.com",
        //     password: "test123"
        // };
        //
        // chai.request(server)
        // .post('/auth/register')
        // .send(user)
        // .end((err, response) => {
        //     console.log("inside register");
        //     // console.log(token);
        //     // token = response.body.token; // save the token!
        //     done();
        // });
        //
        // chai.request(server)
        // .post('/auth/login')
        // .send(user)
        // .end((err, response) => {
        //     console.log("token");
        //     console.log(token);
        //     token = response.body.token; // save the token!
        //     done();
        // });
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
        it('should get 201 register user', (done) => {
            let user = {
                email: "test@test.com",
                password: "test123"
            };

            chai.request(server)
                .post("/auth/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
        it('should get 200 login user', (done) => {
            let user = {
                email: "test@test.com",
                password: "test123"
            };

            chai.request(server)
                .post("/auth/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.should.have.property("message");
                    res.body.data.message.should.equal("User logged in");

                    res.body.data.should.have.property("user");
                    // res.body.data.user.should.have.property("email");
                    // res.body.data.user.email.should.equal("test@test.com");

                    res.body.data.should.have.property("token");
                    token = res.body.data.token;
                    done();
                });
        });
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/docs")
                .set("x-access-token", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("array");
                    // res.body.length.should.be.above(0);
                    done();
                });
        });
    });

    describe('POST /docs', () => {
        it('should get 201 register user', (done) => {
            let user = {
                email: "test@test.com",
                password: "test123"
            };

            chai.request(server)
                .post("/auth/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
        it('should get 200 login user', (done) => {
            let user = {
                email: "test@test.com",
                password: "test123"
            };

            chai.request(server)
                .post("/auth/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.have.property("data");
                    res.body.data.should.have.property("message");
                    res.body.data.message.should.equal("User logged in");

                    res.body.data.should.have.property("user");
                    res.body.data.should.have.property("token");
                    token = res.body.data.token;
                    done();
                });
        });

        it('201 HAPPY PATH', (done) => {
            const data = {
                name: "Test new document",
                content: "Testing 123 content"
            };

            chai.request(server)
                .post("/docs")
                .set("x-access-token", token)
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
