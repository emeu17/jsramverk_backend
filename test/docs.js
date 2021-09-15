process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

describe('Documents', () => {
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
});
