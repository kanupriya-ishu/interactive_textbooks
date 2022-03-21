const router = require("express").Router();
const Book = require("../models/Book");

//CREATE BOOK
router.post("/", async (req, res) => {
  const newBook = new Book(req.body);
  try {
    const savedBook = await newBook.save();
    res.status(200).json(savedBook);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE BOOK
router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book.username === req.body.username) {
      try {
        const updatedBook = await Book.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedBook);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your book!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE BOOK
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book.username === req.body.username) {
      try {
        await book.delete();
        res.status(200).json("Book has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your book!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET BOOK
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  try {
    let books;
    if (username) {
      books = await Book.find({ username });
    } else {
      books = await Book.find();
    }
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.route('/:bookId/lessons')
.get((req,res,next) => {
  Book.findById(req.params.bookId)
  .then((book) => {
      if (book != null) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(book.lessons);
      }
      else {
          err = new Error('Book ' + req.params.bookId + ' not found');
          err.status = 404;
          return next(err);
      }
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) => {
  Book.findById(req.params.bookId)
  .then((book) => {
      if (book != null) {
          book.lessons.push(req.body);
          book.save();
          res.status(200).json(book.lessons);
      }
      else {
          err = new Error('Book ' + req.params.bookId + ' not found');
          err.status = 404;
          return next(err);
      }
  }, (err) => next(err))
  .catch((err) => next(err));
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /books/'
      + req.params.bookId + '/lessons');
})
.delete((req, res, next) => {
  Book.findById(req.params.bookId)
  .then((book) => {
      if (book != null) {
          for (var i = (book.lessons.length -1); i >= 0; i--) {
              book.lessons.id(book.lessons[i]._id).remove();
          }
          book.save()
          .then((book) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(book);                
          }, (err) => next(err));
      }
      else {
          err = new Error('Book ' + req.params.bookId + ' not found');
          err.status = 404;
          return next(err);
      }
  }, (err) => next(err))
  .catch((err) => next(err));    
});

router.route('/:bookId/lessons/:lessonId')
.get((req,res,next) => {
  Book.findById(req.params.bookId)
  .then((book) => {
      if (book != null && book.lessons.id(req.params.lessonId) != null) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(book.lessons.id(req.params.lessonId));
      }
      else if (book == null) {
          err = new Error('Book ' + req.params.bookId + ' not found');
          err.status = 404;
          return next(err);
      }
      else {
          err = new Error('Lesson ' + req.params.lessonId + ' not found');
          err.status = 404;
          return next(err);            
      }
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /books/'+ req.params.bookId
      + '/lessons/' + req.params.lessonId);
})
.put((req, res, next) => {
  Book.findById(req.params.bookId)
  .then((book) => {
      if (book != null && book.lessons.id(req.params.lessonId) != null) {
          if (req.body.lesson_number) {
              book.lessons.id(req.params.lessonId).lesson_number = req.body.lesson_number;
          }
          if (req.body.lesson_title) {
            book.lessons.id(req.params.lessonId).lesson_title = req.body.lesson_title;
          }
          if (req.body.lesson_body) {
            book.lessons.id(req.params.lessonId).lesson_body = req.body.lesson_body;
          }
          book.save()
          .then((book) => {
              Book.findById(book._id)
              .then((book) => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(book);  
              })              
          }, (err) => next(err));
      }
      else if (book == null) {
          err = new Error('book ' + req.params.bookId + ' not found');
          err.status = 404;
          return next(err);
      }
      else {
          err = new Error('lesson ' + req.params.lessonId + ' not found');
          err.status = 404;
          return next(err);            
      }
  }, (err) => next(err))
  .catch((err) => next(err));
})
.delete((req, res, next) => {
  Book.findById(req.params.bookId)
  .then((book) => {
      if (book != null && book.lessons.id(req.params.lessonId) != null) {

          book.lessons.id(req.params.lessonId).remove();
          book.save()
          .then((book) => {
              Book.findById(book._id)
              .then((book) => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(book);  
              })               
          }, (err) => next(err));
      }
      else if (book == null) {
          err = new Error('Book ' + req.params.bookId + ' not found');
          err.status = 404;
          return next(err);
      }
      else {
          err = new Error('Lesson ' + req.params.lessonId + ' not found');
          err.status = 404;
          return next(err);            
      }
  }, (err) => next(err))
  .catch((err) => next(err));
});


module.exports = router;