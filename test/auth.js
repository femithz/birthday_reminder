//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const User = require('../models/user');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();

describe('Users', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => { 
           done();           
        });        
    })
})

// section to test for registering user
describe('/POST user', () => {
    it('it should not POST a user without pages field', (done) => {
        let user = {
            name: "Ajayi Oluwafemi",
            email: "test@gamil.com",
            password: 1954,
            createdAt:Date.now()
        }
      chai.request(app)
          .post('/signup')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                // res.body.errors.should.have.property('pages');
                // res.body.errors.pages.should.have.property('kind').eql('required');
            done();
          });
    });

});
// });