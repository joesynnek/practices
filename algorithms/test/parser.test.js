// import { parse } from "../algorithms/parser"
// import tableStr, { result } from "../data/table"
const parse = require("../parser")
const { table, result } = require("../data/table")

test("table parser", () => {
    const res = parse(table)
    expect(res).toBe(result)
})