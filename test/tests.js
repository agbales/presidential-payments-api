const chaiHttp = require('chai-http');
const app = require('../app');
const chai = require('chai')
      , expect = chai.expect
      , should = chai.should();
chai.use(require('chai-json-schema'));
chai.use(chaiHttp);

const expendituresSchema =  {
  _id: "string",
  type: "string",
  source: "string",
  date: "string",
  amount: "number",
  purpose_scrubbed: "string",
  property_scrubbed: "string",
  purpose: "string",
  property: "string",
  city: "string",
  state: "string"
};


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

              
              res.body.expenditures.every(expenditure => { 
                expenditure.should.be.a('object');
                expenditure.should.have.all.keys(['_id', 'type', 'source', 'date', 'amount', 
                                                  'purpose_scrubbed', 'property_scrubbed', 'purpose', 
                                                  'property', 'city', 'state']);
                // Above 'keys' works, but schema has error in syntax...
                // expenditure.should.be.jsonSchema(expendituresSchema);
              });

              done();
            });
    });

});