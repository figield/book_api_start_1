// try to decorate it

module.exports = db => {
    const books = db.collection("books");

    return ({
        async createOrUpdate({title, slug, authors, isbn, description}) {
            return books.updateOne(
                {isbn: isbn},
                {$set: {title, slug, authors, isbn, description}},
                {upsert: true}
            );
        },
        async findOne(isbn) {
            return books.findOne(
                {isbn},
                {projection: {_id: 0}}
            );
        },
        async findAll() {
            return books
                .find()
                .toArray();
        }
    });
};