process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

describe('Reports', () => {
    describe('GET /', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    // console.log(res.body.data);
                    // console.log(typeof res.body.data.msg);
                    res.body.data.msg.should.be.an("string");
                    // res.body.data.length.should.be.above(0);
                    done();
                });
        });
    });

    describe('GET /errorpage', () => {
        it('404 NONEXISTING PATH', (done) => {
            chai.request(server)
                .get("/errorpage")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("array");
                    done();
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
                    res.body.length.should.be.above(0);
                    done();
                });
        });
    });

    describe('POST /docs', () => {
        it('201 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/docs")
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
            chai.request(server)
                .put("/docs")
                .end((err, res) => {
                    res.should.have.status(204);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });

    describe('GET /list', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/list")
                .end((err, res) => {
                    res.should.have.status(200);
                    // console.log(typeof res.body);
                    res.body.should.be.an("array");
                    // res.body.data.should.be.an("array");
                    res.body.length.should.be.above(0);

                    done();
                });
        });
    });
});
