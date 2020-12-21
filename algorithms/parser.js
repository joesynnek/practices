// import table from "../data/table"

const START_STRING = "<table"
const END_STRING = "</table>"

const { indexOf, slice, trim } = String.prototype

const propsExp = /props="(\S+:\s*.+)"/

function getStartTagExp(tagName = "cell") {
    const startTag = /^<(?<!\/)([a-z|A-Z|-]+)/
    return new RegExp(`^<(?<!\/)${tagName}`)
}
function getEndTagExp(tagName = "cell") {
    const endTag = /(?<=^<\/)([a-z|A-Z|-]+)>/
    return new RegExp(`(?<=^<\/)${tagName}>`)
}


const tablePropsFn = {
    "table-column-props": function getColumns(str) {
        const cols = str.split("/").filter(item => item)
        // const colGroup = Array.prototype.reduce.call(cols, (acc, cur) => {
        //     return acc + `<col width=${cur}></col>`
        // }, "<colgroup>") + "</colgroup>"
        return cols
    }
}

//
function getRange(str) {
    const { indexOf } = String.prototype
    if (typeof str !== "string") {
        console.warn("input must be string!")
    }
    const start = indexOf.call(str, START_STRING)
    if (start === -1) return [-1, -1]
    const end = indexOf.call(str.slice(start), END_STRING) + start
    return [start, end]
}

//
function parseTable(str, start, end) {
    let p = start
    while (str[p] !== ">") {
        p++
    }
    let tableProps = propsExp.exec(str.slice(start + 1, p))[1]
    if (tableProps) {
        let cols = null
        tableProps
            .split(";")
            .map(prop => {
                let tmp = prop.split(":")
                return {
                    key: tmp[0],
                    value: tmp[1]
                }
            }).map(prop => {
                if (typeof tablePropsFn[prop.key] === "function") {
                    if (prop.key === "table-column-props") {
                        cols = tablePropsFn[prop.key](prop.value)
                    }
                    return tablePropsFn[prop.key](prop.value)
                } else {
                    return null
                }
            }).filter(item => item)
        if (!cols) {
            console.error("无法获取表格列数")
            return str
        } else {
            let tableCells = parseTableCells(str, start, end, "cell", cols.length)
            let res = `<table>`
            res += Array.prototype.reduce.call(cols, (acc, cur) => {
                return acc + `<col width=${parseFloat(cur) * 37.8 + "px"}></col>`
            }, "<colgroup>") + "</colgroup>"
            for (let i = 0; i < tableCells.length; i++) {
                let tmp = "<tr>"
                for (let j = 0; j < cols.length; j++, i++) {
                    tmp += tableCells[i]
                }
                tmp += "</tr>"
                res += tmp
                i--
            }
            res += "</table>"
            return res
        }
    }
}

//
function parseTableCells(str, start, end, element = "cell", column = 0) {
    const startTagExp = getStartTagExp(element), endTagExp = getEndTagExp(element)
    let p = start
    let res = []
    while (p <= end) {
        if (startTagExp.test(str.slice(p))) {
            while (str[p] !== ">" && p <= end) {
                p++
            }
            const contentStart = ++p
            while (!endTagExp.test(str.slice(p)) && p <= end) {
                p++
            }
            const contentEnd = p
            if (element === "cell") {
                let { content, props } = parseTableCells(str, contentStart, contentEnd, "p")
                props = "text-align: left"  // 部分样式无法识别
                if (res.length < column) {
                    res.push(`<td ${props ? `style="${props}"` : ""}>${content}</td>`)
                } else {
                    res.push(`<td ${props ? `style="${props}"` : ""}>${content}</td>`)
                }
            } else if (element === "p") {
                const propRes = propsExp.exec(str.slice(start, end))
                res = {
                    content: parseTableCells(str, contentStart, contentEnd, "c").trim(),
                    props: propRes ? propRes[1] : ""
                }
            } else if (element === "c") {
                res += str.slice(contentStart, contentEnd) + " "
            }
        }
        p++
    }
    return res
}


//
function parser(str) {
    const [start, end] = getRange(str)
    if (Number.isNaN(end - start) || end - start < "<table></table>".length) return str
    let res = slice.call(str, 0, start) + parseTable(str, start, end) + slice.call(str, end)
    res = res.trim()
    const fs = require("fs")
    fs.writeFile("a.txt", res, { flag: 'w+', encoding: 'utf8' }, function (err) {
        if (err) {
            console.error(err);
            return;
        }
    });
    return res
}
module.exports = parser