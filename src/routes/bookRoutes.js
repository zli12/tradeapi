var express = require('express');

var routes = function(Book) {
  var bookRouter = express.Router();
  var bookController = require('../controllers/bookController')(Book);

  bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.get);
  bookRouter.use('/:bookId', function(req, res, next) {
    Book.findById(req.params.bookId, function(err, book) {
      if (err) {
        res.status(500).send(err);
      } else if (book) {
        req.book = book;
        next();
      } else {
        res.status(404).send('no book found');
      }
    });
  });
  bookRouter.route('/:bookId')
    .get(function(req, res) {
      var returnBook = req.book.toJSON();

      returnBook.links = {};
      var url = 'http://' + req.headers.host + '/api/books?genre=' + returnBook.genre;
      returnBook.links.FilterByThisGenre = url.replace(' ', '%20');
      res.json(returnBook);
    })
    .put(function(req, res) {
      var book = req.book;
      var update = req.body;
      book.title = update.title;
      book.author = update.author;
      book.genre = update.genre;
      book.read = update.read;
      book.save(function(err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(book);
        }
      });
    })
    .patch(function(req, res) {
      var book = req.book;
      var updates = req.body;

      if (updates._id)
        delete req.body._id;

      for (var u in updates) {
        book[u] = updates[u];
      }

      book.save(function(err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(book);
        }
      });
    })
    .delete(function(req, res) {
      req.book.remove(function(err) {
        if(err) {
          res.status(500).send(err);
        } else {
          res.status(204).send('Book removed.');
        }
      });
    });

  return bookRouter;
};

module.exports = routes;
