const bookServiceFactory = require("../../src/bookService");
const bookRepository = require("../../src/inMemoryBookRepository");
const assert = require("assert");

describe('Book service', function () {
    it('can create a book', async function () {
        // given
        const bookService = bookServiceFactory(bookRepository);

        // when
        await bookService.createOrUpdate({title: "some title", isbn: "ISBN"});

        // then
        const book = await bookRepository.findOne("ISBN")
        assert.deepStrictEqual(book, {title: "some title", slug: "some-title", isbn: "ISBN"});
    });
});