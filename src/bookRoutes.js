const router = require('express').Router();
const {createOrUpdate, details } = require("./bookController");

router.post("/book", createOrUpdate);
router.get("/book/:isbn", details);

module.exports = router;