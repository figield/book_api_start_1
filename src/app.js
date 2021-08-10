const express = require("express");
const MongoClient = require('mongodb').MongoClient;
const app = express();

const url = 'mongodb://localhost:27017/booksapi';

function log(req, res, next) {
    // log incoming request
    next();
}

function auth(req, res, next) {
    // do auth
    next();
}

// application scope vs request scope


app.use(express.json());
app.use(log);
// app.use(auth);
app.get("/", auth, function (req, res) {
    res.send("Hello World!");
});

// function(err, client) {
//     books = client.db().collection("books");
// }
const booksPromise = MongoClient.connect(url).then(client => client.db().collection("books"));

app.post("/book", function (req, res, next) {
    const {title, authors, isbn, description} = req.body;
    booksPromise
        .then(books => books.updateOne(
            {isbn: isbn},
            {$set: {title, authors, isbn, description}},
            {upsert: true}
        ))
        .then(() => {
            res.json({title, authors, isbn, description})
        })
        .catch(next);
});

app.get("/book/:isbn", function (req, res, next) {
    const isbn = req.params.isbn;
    booksPromise
        .then(function (books) {
            return books.findOne(
                {isbn},
                {projection: {_id: 0}}
            );
        })
        .then(function (book) {
            res.json(book);
        })
        .catch(next);
});

app.use(function notFound(req, res, next) {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500);
    res.json({message: err.message, error: err.stack});
});

module.exports = app;