/**
 * @param {number[]} nums
 * @return {number}
 */
module.exports = function minimumMountainRemovals(nums) {
    const len = nums.length
    let f = Array(len).fill(1),
        g = Array(len).fill(1)

    for (let i = 1; i < len; i++) {
        for (let j = i; j >= 0; j--) {
            if (nums[j] < nums[i]) {
                f[i] = Math.max(f[j] + 1, f[i])
            }

        }
    }
    for (let i = len - 2; i >= 0; i--) {
        for (let j = i; j < len; j++) {
            if (nums[j] < nums[i]) {
                g[i] = Math.max(g[j] + 1, g[i])
            }
        }  
    }
    let res = 0
    for (let i = 1; i < len - 1; i++) {
        res = Math.max(res, f[i] + g[i] - 1)
    }
    return len - res
};