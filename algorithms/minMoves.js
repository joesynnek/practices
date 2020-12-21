/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number}
 */
var minMoves = function (nums, limit) {
    const len = nums.length
    let diff = Array(2 * len + 1).fill(0)
    for (let i = 0; i < len >> 1; i++) {
        const A = nums[i], B = nums[len - i - 1]
        diff[2] += 2
        diff[2 * limit + 1] -= 2
        diff[Math.min(A, B) + 1]--
        diff[limit + Math.max(A, B) + 1]++
        diff[A + B]--
        diff[A + B + 1]++
    }
    let res = len, sum = 0

    for (let i = 2; i <= 2 * limit; i++) {
        sum += diff[i]
        if (sum < res) res = sum
    }
    return res
};

module.exports = minMoves