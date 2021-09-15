process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const HTMLParser = require('node-html-parser');

chai.should();

chai.use(chaiHttp);

describe('App.js', () => {
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
});
