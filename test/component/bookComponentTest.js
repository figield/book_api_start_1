const httpClient = require('supertest');
const app = require('../../src/app');

describe('Book inventory', function () {
    it('allows to stock up the items', function (done) {
        httpClient(app)
            .post('/book')
            .send({
                title: "JavaScript in Action",
                authors: ["James Smith", "Kate Donovan"],
                isbn: "0123456789",
                description: "The ultimate JS book!"
            })
            .set('Content-Type', 'application/json')
            .expect(200, {
                title: "JavaScript in Action",
                authors: ["James Smith", "Kate Donovan"],
                isbn: "0123456789",
                description: "The ultimate JS book!"
            }, done);
    })
});