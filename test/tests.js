const chaiHttp = require('chai-http');
const app = require('../app');
const chai = require('chai')
      , expect = chai.expect
      , should = chai.should();
chai.use(require('chai-json-schema'));
chai.use(chaiHttp);

describe('Expenditures', function() {
    this.timeout(5000);

    it('should returns JSON object on /expenditures GET', function(done) {
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
      chai.request(app)
        .get('/expenditures')
        .end(function(err, res){
          res.body.should.have.property('response_total');
          res.body.response_total.should.be.a('number'); 
          done();
        })
    });

    it('should return array of expenditures in proper schema /expenditures GET', function(done) {
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

    it('should return 200 response for valid queries on /expenditures GET', function(done) {
      chai.request(app)
        .get('/expenditures?amount>1000')
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          done();
        });
    });

    it('should return 200 response for mulitple queries on /expenditures GET', function(done) {
      chai.request(app)
        .get('/expenditures?amount>1000&type=FEC')
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          done();
        });
    });

    it('should return 400 Error for an invalid query on /expenditures GET', function(done) {
      chai.request(app)
        .get('/expenditures?kittens=100')
        .end(function(err, res){
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          done();
        });
    });

    it('should return 400 Error for invalid query alongside valid queries on /expenditures GET', function(done) {
      chai.request(app)
        .get('/expenditures?amount=9000&kittens=100')
        .end(function(err, res){
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a('object');
          done();
        });
    });


});

describe('Distinct', function() {
  this.timeout(5000);

  it('should return a JSON array on /distinct GET', function(done) {
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