const router = require('express').Router();
const {createOrUpdate, details } = require("./bookController");
const validateBook = require("./validateBookMiddleware");

router.post("/book", validateBook, createOrUpdate);
router.get("/book/:isbn", details);

module.exports = router;