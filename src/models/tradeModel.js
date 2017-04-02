var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tradeModel = new Schema({
  symbol: {
    type: String
  },
  action: {
    type: String
  },
  amount: {
    type: Number
  },
  manager: {
    type: String
  },
  trader: {
    type: String
  },
  custodian: {
    type: String
  },
  strategy: {
    type: String
  }
});

module.exports = mongoose.model('Trade', tradeModel);
