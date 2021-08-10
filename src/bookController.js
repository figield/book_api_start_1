const bookRepository = require("./bookRepository");
const bookService = require("./bookService");

module.exports = {
    async createOrUpdate(req, res, next) {
        // HTTP
        const {title, authors, isbn, description} = req.body;
        try {
            // JS
            await bookService.createOrUpdate({title, authors, isbn, description});
            // HTTP
            res.redirect(`/book/${isbn}`);
        } catch (e) {
            next(e);
        }
    },
    async details(req, res, next) {
        try {
            const isbn = req.params.isbn;
            const book = await bookRepository.findOne(isbn);
            res.json(book);
        } catch(e) {
            next(e);
        }
    }
};