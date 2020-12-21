const minimumMountainRemovals = require("../minimumMountainRemovals")

test("minimumMountainRemovals", () => {
    expect(minimumMountainRemovals([1, 3, 1])).toBe(0)
    expect(minimumMountainRemovals([2, 1, 1, 5, 6, 2, 3, 1])).toBe(3)
    expect(minimumMountainRemovals([4, 3, 2, 1, 1, 2, 3, 1])).toBe(4)
    expect(minimumMountainRemovals([1, 2, 3, 4, 4, 3, 2, 1])).toBe(1)
})