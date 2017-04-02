var tradeController = function(Trade) {
  var post = function(req, res) {
    var trade = new Trade(req.body);

    if(!trade.symbol) {
      res.status(400);
      res.send('Symbol is required');
    }
    else {
      trade.save();
      res.status(201);
      res.send(trade);
    }
  };

  var get = function(req, res) {
    var query = {};

    if (req.query.symbol) {
      query.symbol = req.query.symbol;
    }

    Trade.find(query, function(err, trades) {
      if (err) {
        res.status(500).send(err);
      } else {
        var returnedTrades = [];
        trades.forEach(function(element, index, array){
          var clonedTrade = element.toJSON();
          clonedTrade.links = {};
          clonedTrade.links.self = 'http://' + req.headers.host + '/api/trades/' + clonedTrade._id;
          returnedTrades.push(clonedTrade);
        });
        res.json(returnedTrades);
      }
    });
  };

  return {
    post: post,
    get: get
  };
};

module.exports = tradeController;
