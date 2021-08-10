function notFound(req, res, next) {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
}

function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500);
    res.json({message: err.message, error: err.stack});
}

module.exports = {notFound, errorHandler};