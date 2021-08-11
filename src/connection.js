const MongoClient = require("mongodb").MongoClient;
const url = 'mongodb://localhost:27017/booksapi';
const connectionPromise = MongoClient.connect(url);
const dbPromise = connectionPromise.then(client => client.db());

module.exports = dbPromise;