const bookServiceFactory = require("../../src/bookService");
const bookRepositoryFactory = require("../../src/inMemoryBookRepository");
const assert = require("assert");

describe('Book service', function () {
    it('can create a book', async function () {
        // given
        const bookRepository = bookRepositoryFactory();
        const bookService = bookServiceFactory(bookRepository);

        // when
        await bookService.createOrUpdate({title: "some title", isbn: "ISBN"});

        // then
        const book = await bookRepository.findOne("ISBN")
        assert.deepStrictEqual(book, {title: "some title", slug: "some-title", isbn: "ISBN"});
    });

    it('should not read a book from a previous test', async function () {
        const bookRepository = bookRepositoryFactory();

        const book = await bookRepository.findOne("ISBN")

        assert.deepStrictEqual(book, undefined);
    });
});