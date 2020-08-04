const { pipe, replace } = require('ramda/src')
const json2md = require('json2md')

exports.json2md = (jsonString) => pipe(json2md, removeEmptyLines)(jsonString)

const removeEmptyLines = (text) => pipe(replace(/^\s*\n/gm, ''), replace(/##/gm, '\n##'))(text)
