const quickSort = require("../quickSort")

test("quick sort", () => {
    let arr = [3, 2, 4, 1]
    // 1
    quickSort(arr, 0, arr.length - 1)
    expect(arr).toEqual([1, 2, 3, 4])
    // 2
    arr = []
    quickSort(arr, 0, arr.length - 1)
    expect(arr).toEqual([])
    // 3
    arr = Array(100)
        .fill(0)
        .map((_, index) => 99 - index)
    quickSort(arr, 0, arr.length - 1)
    expect(arr).toEqual(
        Array(100)
            .fill(0)
            .map((_, index) => index)
    )
})
