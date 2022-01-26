var sum = require('./sum')

describe("SUM TESTS", ()=> {
    it('adds 1 + 2 to equal 3', function() {
        expect(sum(1, 2)).toBe(3)
    })
});
