const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();

chai.use(chaiHttp);

const assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

describe('Expenditures', function() {
    it('should list ALL expenditures on /expenditures GET', function(done) {
        chai.request(app)
            .get('/expenditures')
            .end(function(err, res){
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
              res.body.should.have.property('response_total');
              res.body.response_total.should.be.a('number'); 
              res.body.should.have.property('expenditures');
              res.body.expenditures.should.be.a('array');

              // expenditures array should contain objects
              //                                   objects should hace X, Y, Z properties                 
              // have.all.keys(['_id', 'type', 'source', 'date', 'amount', 'purpose_scrubbed',
              //                                                        'property_scrubbed', 'purpose', 'property', 'city', 'state']);
              done();
            });
    });

});