module.exports = function radixSort(nums) {
    if(!Array.isArray(nums)) {
        return new TypeError()
    }
    const n = nums.length;
    let exp = 1;
    const buf = new Array(n).fill(0);
    const maxVal = nums.reduce((acc, cur) => {
        return Math.max(acc, cur)
    }, 0)

    while (maxVal >= exp) {
        const cnt = new Array(10).fill(0);
        for (let i = 0; i < n; i++) {
            let digit = Math.floor(nums[i] / exp) % 10;
            cnt[digit]++;
        }
        for (let i = 1; i < 10; i++) {
            cnt[i] += cnt[i - 1];
        }
        for (let i = n - 1; i >= 0; i--) {
            let digit = Math.floor(nums[i] / exp) % 10;
            buf[cnt[digit] - 1] = nums[i];
            cnt[digit]--;
        }
        nums.splice(0, n, ...buf);
        exp *= 10;
    }
    return nums
}