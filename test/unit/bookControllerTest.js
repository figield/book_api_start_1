const assert = require('assert');
const bookControllerFactory = require('../../src/bookController');

describe('Book controller', function () {
    it('create or update happy path', async function () {
        // given
        const req = {body: {isbn: 'ISBN'}};
        const res = {
            redirect(path) {
                res.redirect.invokedWith = path;
            }
        }
        const bookService = {
            async createOrUpdate() {}
        };
        const bookController = bookControllerFactory({bookService});

        // when
        await bookController.createOrUpdate(req, res, console.log);

        // then
        assert.deepStrictEqual(res.redirect.invokedWith, '/book/ISBN');
    });
});