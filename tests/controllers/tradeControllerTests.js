var should = require('should');
var sinon = require('sinon');

describe('Trade Controller Tests: ', function() {
  describe('Post', function() {
    it('should not allow an empty symbol on post', function() {
      var Trade = function(trade) {
        this.save = function(){};
      };

      var req = {
        body: {
          action: 'BUY'
        }
      };

      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      };

      var tradeController = require('../../src/controllers/tradeController')(Trade);
      tradeController.post(req, res);

      res.status.calledWith(400).should.equal(true, 'Bad status ' + res.status.args[0][0]);
      res.send.calledWith('Symbol is required').should.equal(true);
    });
  });
});
