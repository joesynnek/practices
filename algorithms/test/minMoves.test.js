const minMoves = require("../minMoves")

test("min moves", () => {
    expect(minMoves([1, 2, 4, 3], 4)).toBe(1)
    expect(minMoves([1, 2, 2, 1], 2)).toBe(2)
    expect(minMoves([1, 2, 1, 2], 2)).toBe(0)
})