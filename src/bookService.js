const makeSlug = require("./makeSlug");
const bookRepository = require("./bookRepository");

module.exports = {
    async createOrUpdate({title, authors, isbn, description}) {
        const slug = makeSlug(title);
        return bookRepository.createOrUpdate({title, authors, isbn, description, slug})
    }
};