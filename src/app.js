const express = require("express");
const bookRoutes = require("./bookRoutes");
const app = express();

function log(req, res, next) {
    // log incoming request
    next();
}

function auth(req, res, next) {
    // do auth
    next();
}

// application scope vs request scope


app.use(express.json());
app.use(log);
// app.use(auth);
app.get("/", auth, function (req, res) {
    res.send("Hello World!");
});

app.use("/", bookRoutes)

app.use(function notFound(req, res, next) {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500);
    res.json({message: err.message, error: err.stack});
});

module.exports = app;