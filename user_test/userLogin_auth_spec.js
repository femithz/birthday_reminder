/*jshint esversion: 6 */
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const app = require('../app');


// section to test for registering user
describe('/POST user', () => {
    it('it should not POST a user without  field', (done) => {
        let user = {
            email: "test@gamil.com",
            password: 2019
        }
      chai.request(app)
          .post('/login')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
            done();
          });
    });
    it('Fail, to login user in', (done) => {
        let user = {
            email: "test@gamil.com",
            // password: 2019
        }
      chai.request(app)
          .post('/login')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                const body = res.user;
                expect(body.errors.text.name).to.equal('ValidatorError')
            done();
          });
    });
});