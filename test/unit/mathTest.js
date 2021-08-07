const assert = require('assert');

describe('Math in JS', function () {
    it('should support +', function (done) {
        setTimeout(() => {
            assert.deepStrictEqual(1 + 1, 2);
            done();
        }, 100);

    });
});