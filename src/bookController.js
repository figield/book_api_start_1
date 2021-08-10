const bookRepository = require("./bookRepository");

module.exports = {
    async createOrUpdate(req, res, next) {
        const {title, authors, isbn, description} = req.body;
        try {
            await bookRepository.createOrUpdate({title, authors, isbn, description});
            res.json({title, authors, isbn, description});
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