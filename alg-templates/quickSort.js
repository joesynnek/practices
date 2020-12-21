function quickSort(arr, s, e) {
    if (s >= e) return;

    let l = s, r = e, base = arr[s + e >> 1]
    while (l < r) {
        while (arr[l] < base) l++;
        while (arr[r] > base) r--;
        if (l < r) {
            [arr[l], arr[r]] = [arr[r], arr[l]]
        }
    }
    quickSort(arr, s, r)
    quickSort(arr, r + 1, e)
}

module.exports = quickSort