const httpClient = require('supertest');
const assert = require('assert');
const app = require('../../src/app');

describe('Book inventory', function () {
    it('allows to stock up the items', async function () {
        const request = httpClient(app);

        // POST/CREATE
        const createResult = await request
            .post('/book')
            .send({
                title: "JavaScript in Action",
                authors: ["James Smith", "Kate Donovan"],
                isbn: "2123456789",
                description: "The ultimate JS book!"
            })
            .set('Content-Type', 'application/json')
            .expect(302);

        // GET/READ
        const readResult = await request.get(createResult.header.location).expect(200);

        assert.deepStrictEqual(readResult.body, {
            title: "JavaScript in Action",
            authors: ["James Smith", "Kate Donovan"],
            isbn: "2123456789",
            description: "The ultimate JS book!"
        });

    })
});