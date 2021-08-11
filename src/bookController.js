const mapValues = require("lodash.mapvalues");

// const mapValues = (api, f) => Object.fromEntries(Object.entries(api).map(([key, value]) => [key, f(value)]));


function withErrorHandling(api) {
    return mapValues(api, wrapWithTryCatch);
}

const wrapWithTryCatch = (fn) => {
    return function (req, res, next) {
        return Promise.resolve(fn(req, res, next)).catch(next);
        // try {
        //     return fn(req, res, next);
        // } catch(e) {
        //     next(e);
        // }
    };
};


module.exports = ({bookService, bookRepository}) => withErrorHandling({
    async createOrUpdate(req, res, next) {
        const {title, authors, isbn, description} = req.body;
        await bookService.createOrUpdate({title, authors, isbn, description});
        res.redirect(`/book/${isbn}`);
    },
    async details(req, res, next) {
        const isbn = req.params.isbn;
        const book = await bookRepository.findOne(isbn);
        res.json(book);
    }
});