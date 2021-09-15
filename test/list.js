process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

describe('List docs', () => {
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
