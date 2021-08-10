const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/booksapi';

const booksPromise = MongoClient.connect(url).then(client => client.db().collection("books"));

// group routes - Router
router.post("/book", async function (req, res, next) {
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

router.get("/book/:isbn", async function (req, res, next) {
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

module.exports = router;