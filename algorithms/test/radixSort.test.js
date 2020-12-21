const func = require("../radixSort")

test("empty", () => {
    expect(func([])).toEqual([])
})

test("normal", () => {
    expect(func([4, 3, 2, 1])).toEqual([1, 2, 3, 4])
})

test("invalid", () => {
    expect(func({})).toEqual(new TypeError())
})