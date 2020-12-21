const fourSumCount = require("../fourSumCount")

test("four sum count", () => {
    expect(fourSumCount([ 1, 2], [-2,-1], [-1, 2], [ 0, 2])).toBe(2)
})