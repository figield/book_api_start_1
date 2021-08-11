const makeSlug = require("./makeSlug");

const bookService = bookRepository => ({
    async createOrUpdate(book) {
        const slug = makeSlug(book.title);
        await bookRepository.createOrUpdate({...book, slug});
    }
});

module.exports = bookService;