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

app.post("/book", async function (req, res, next) {
    const {title, authors, isbn, description} = req.body;
    try {
        const books = await booksPromise;
        await books.updateOne(
            {isbn: isbn},
            {$set: {title, authors, isbn, description}},
            {upsert: true}
        )
        res.json({title, authors, isbn, description});
    } catch (e) {
        next(e);
    }
});

app.get("/book/:isbn", async function (req, res, next) {
    const isbn = req.params.isbn;
    try {
        const books = await booksPromise;
        const book = await books.findOne(
            {isbn},
            {projection: {_id: 0}}
        );
        res.json(book);
    } catch (e) {
        next(e);
    }

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