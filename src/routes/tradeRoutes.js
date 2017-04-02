var express = require('express');

var routes = function(Trade) {
  var tradeRouter = express.Router();
  var tradeController = require('../controllers/tradeController')(Trade);

  tradeRouter.route('/')
    .post(tradeController.post)
    .get(tradeController.get);
  tradeRouter.use('/:tradeId', function(req, res, next) {
    Trade.findById(req.params.tradeId, function(err, trade) {
      if (err) {
        res.status(500).send(err);
      } else if (trade) {
        req.trade = trade;
        next();
      } else {
        res.status(404).send('no trade found');
      }
    });
  });
  tradeRouter.route('/:tradeId')
    .get(function(req, res) {
      var returnTrade = req.trade.toJSON();

      returnTrade.links = {};
      var url = 'http://' + req.headers.host + '/api/trades?symbol=' + returnTrade.symbol;
      returnTrade.links.FilterByThisSymbol = url.replace(' ', '%20');
      res.json(returnTrade);
    })
    .put(function(req, res) {
      var trade = req.trade;
      var update = req.body;
      trade.symbol = update.symbol;
      trade.action = update.action;
      trade.amount = update.amount;
      trade.manager = update.manager;
      trade.trader = update.trader;
      trade.custodian = update.custodian;
      trade.strategy = update.strategy;
      trade.save(function(err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(trade);
        }
      });
    })
    .patch(function(req, res) {
      var trade = req.trade;
      var updates = req.body;

      if (updates._id)
        delete req.body._id;

      for (var u in updates) {
        trade[u] = updates[u];
      }

      trade.save(function(err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(trade);
        }
      });
    })
    .delete(function(req, res) {
      req.trade.remove(function(err) {
        if(err) {
          res.status(500).send(err);
        } else {
          res.status(204).send('Trade deleted.');
        }
      });
    });

  return tradeRouter;
};

module.exports = routes;
