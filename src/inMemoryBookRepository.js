const books = {};

module.exports = {
    async createOrUpdate(book) {
        books[book.isbn] = book;
    },
    async findOne(isbn) {
        return books[isbn];
    }
};