const chaiHttp = require('chai-http');
const app = require('../app');
const chai = require('chai')
      , expect = chai.expect
      , should = chai.should();
chai.use(require('chai-json-schema'));
chai.use(chaiHttp);

describe('Expenditures', function() {
    it('should returns JSON object on /expenditures GET', function(done) {
      this.timeout(5000);
      chai.request(app)
        .get('/expenditures')
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          done();
        });
    });

    it('should return numeric response_total /expenditures GET', function(done) {
      this.timeout(5000)
      chai.request(app)
        .get('/expenditures')
        .end(function(err, res){
          res.body.should.have.property('response_total');
          res.body.response_total.should.be.a('number'); 
          done();
        })
    });

    it('should return array of expenditures in proper schema /expenditures GET', function(done) {
      this.timeout(5000)
      chai.request(app)
        .get('/expenditures')
        .end(function(err, res){
          res.body.should.have.property('expenditures');
          res.body.expenditures.should.be.a('array');
          res.body.expenditures.every(expenditure => { 
            expenditure.should.be.a('object');
            expenditure.should.have.all.keys(['_id', 'type', 'source', 'date', 'amount', 
                                              'purpose_scrubbed', 'property_scrubbed', 'purpose', 
                                              'property', 'city', 'state']);
          });
          done();
        })
    });
});

describe('Distinct', function() {
  it('should return a JSON array on /distinct GET', function(done) {
    this.timeout(5000);
    chai.request(app)
      .get('/distinct')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      });
  });

  it('should contain objects with one key/value pair where value is non-empty array on /distinct GET', function(done) {
    this.timeout(5000);
    chai.request(app)
      .get('/distinct')
      .end(function(err, res){
        res.body.every(entry => { 
          let key = Object.keys(entry);
          entry.should.be.a('object');
          [key].should.have.lengthOf(1);
          [key][0].should.not.be.empty;
        });
        done();
      });
  });
});