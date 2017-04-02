var should = require('should');
var request = require('supertest');
var app = require('../../app.js');
var mongoose = require('mongoose');
var Trade = mongoose.model('Trade');
var agent = request.agent(app);

describe('Trade CRUD test', function() {
  it('Should allow a trade to be posted and return symbol and _id', function(done) {
    var tradePost = {
      symbol: 'MSFT',
      manager: 'ZLI',
      trader: 'TT',
      action: 'BUY',
      amount: 1000
    };

    agent.post('/api/trades')
      .send(tradePost)
      .expect(200)
      .end(function(err, result) {
        result.body.symbol.should.equal('MSFT');
        result.body.should.have.property('_id');
        done();
      });
  });

  afterEach(function(done) {
    Trade.remove().exec();
    done();
  });
});
