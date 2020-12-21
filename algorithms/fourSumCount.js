/* 
    solution 1
    less space
*/
const fnCompare = function (x, y) {
    return x - y;
}

function binarySearch(a, val) {
    let r = a.length - 1, l = 0;
    if (r < 0) {
        return -1;
    }
    if ((val < a[0]) || (val > a[r])) {
        return -1;
    }
    while (l <= r) {
        if (val === a[l]) {
            return l;
        }
        if (val === a[r]) {
            return r;
        }
        let mid = Math.floor((l + r) / 2);
        if (val < a[mid]) {
            l++;
            r = mid - 1;
        } else if (val > a[mid]) {
            l = mid + 1;
            r--;
        } else {
            return mid;
        }
    }
    return -1;
}

/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @param {number[]} D
 * @return {number}
 */
module.exports = function fourSumCount(A, B, C, D) {
    let len = A.length;
    if (len === 0) {
        return 0;
    }
    A = A.sort(fnCompare);
    B = B.sort(fnCompare);
    C = C.sort(fnCompare);
    D = D.sort(fnCompare);

    let cnt = 0, cntA = 0, cntB = 0, cntC = 0, sumAB;
    for (let i = 0, valA = undefined; i < len; i++) {
        if (valA === A[i]) {
            cnt += cntA;
            continue;
        }
        valA = A[i];
        cntA = 0;
        for (let j = 0, valB = undefined; j < len; j++) {
            if (valB === B[j]) {
                cntA += cntB;
                continue;
            }
            valB = B[j];
            cntB = 0;
            sumAB = valA + valB;
            for (let k = 0, valC = undefined; k < len; k++) {
                if (valC === C[k]) {
                    cntB += cntC;
                    continue;
                }
                valC = C[k];
                cntC = 0;

                let valD = 0 - sumAB - valC;
                let idx = binarySearch(D, valD);
                // let idx = D.findIndex((e) => e === valD);
                if (idx >= 0) {
                    cntC++;
                    for (let l = idx + 1; l < len && D[l] === valD; l++) {
                        cntC++;
                    }
                    for (let l = idx - 1; l >= 0 && D[l] === valD; l--) {
                        cntC++;
                    }
                    cntB += cntC;
                }
            }
            cntA += cntB;
        }
        cnt += cntA;
    }
    return cnt;
};

/*
var fourSumCount = function (A, B, C, D, h = new Map(), r = 0) {
    for (var a of A)
        for (var b of B)
            h.set(0 - a - b, (h.get(0 - a - b) || 0) + 1)
    for (var c of C)
        for (var d of D)
            h.has(c + d) && (r += h.get(c + d))
    return r
};
*/
