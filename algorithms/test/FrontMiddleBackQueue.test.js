const FrontMiddleBackQueue = require("../FrontMiddleBackQueue")

test("front middle back queue", () => {
    var obj = new FrontMiddleBackQueue()
    obj.pushFront(1)
    obj.pushMiddle(2)
    obj.pushBack(3)
    expect(obj.popFront()).toBe(2)
    expect(obj.popMiddle()).toBe(1)
    expect(obj.popBack()).toBe(3)

    obj.pushFront(1);   // [1]
    obj.pushBack(2);    // [1, 2]
    obj.pushMiddle(3);  // [1, 3, 2]
    obj.pushMiddle(4);  // [1, 4, 3, 2]
    expect(obj.contl).toEqual([1, 4, 3, 2])
    expect(obj.popFront()).toBe(1);     // 返回 1 -> [4, 3, 2]
    expect(obj.popMiddle()).toBe(3);    // 返回 3 -> [4, 2]
    expect(obj.contl).toEqual([4, 2])
    expect(obj.popMiddle()).toBe(4);    // 返回 4 -> [2]
    expect(obj.popBack()).toBe(2);      // 返回 2 -> []
    expect(obj.popFront()).toBe(-1);     // 返回 -1 -> [] （队列为空）
})