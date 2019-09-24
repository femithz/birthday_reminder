/*jshint esversion: 6 */
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const app = require('../app');


describe('POST contact', () => {
    it('it should not POST a user without  field', (done) => {
        let contact = {
            name: "Ajayi Oluwafemi",
            email: "test@gamil.com",
            address: "No 28,Michigan,America",
            birthday:  "29-02-2016",
            phoneNumber:  08145019560,
            contactOwner: req.user._id,
            createdAt:Date.now(),
        };
        chai.request(app)
        .post('/')
        .send(contact)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
        done();
      });
    })
})