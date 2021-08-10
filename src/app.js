const express = require("express");
const bookRoutes = require("./bookRoutes");
const {notFound, errorHandler} = require("./errors");
const app = express();

app.use(express.json());
app.get("/", function (req, res) {
    res.send("Hello World!");
});

app.use("/", bookRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;