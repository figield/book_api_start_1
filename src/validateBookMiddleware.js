const validateBook = require("./validateBook");

module.exports = function validate(req, res, next) {
    const validateErrors = validateBook(req.body);

    if(validateErrors) {
        const error = new Error();
        error.message = validateErrors;
        error.status = 400;
        next(error);
    } else {
        next();
    }
}