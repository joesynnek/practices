var FrontMiddleBackQueue = function () {
    this.contl = []
    this.length = 0
};

/** 
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushFront = function (val) {
    this.contl.unshift(val)
    this.length++
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popFront = function () {
    if (this.length === 0) return -1
    this.length--
    return this.contl.shift()
};

/** 
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushBack = function (val) {
    this.contl.push(val)
    this.length++
};


/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popBack = function () {
    if (this.length === 0) {
        return -1
    }
    this.length--
    return this.contl.pop()
};

/** 
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushMiddle = function (val) {
    const mid = this.length >> 1
    this.contl.splice(mid, 0, val)
    this.length++
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popMiddle = function () {
    if (this.length === 0) return -1
    this.length--
    return this.contl.splice(this.length >> 1, 1)[0]
};

/**
 * Your FrontMiddleBackQueue object will be instantiated and called as such:
 * var obj = new FrontMiddleBackQueue()
 * obj.pushFront(val)
 * obj.pushMiddle(val)
 * obj.pushBack(val)
 * var param_4 = obj.popFront()
 * var param_5 = obj.popMiddle()
 * var param_6 = obj.popBack()
 */

module.exports = FrontMiddleBackQueue