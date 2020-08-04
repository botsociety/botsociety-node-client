const { pipe, replace } = require('ramda/src')
const YAML = require('json2yaml')

exports.json2yaml = (jsonString) =>
  pipe(YAML.stringify, replaceQuotationMarks, replaceListOnNewLine, fixIndentation, removeFirstLine, removeEmptyObjects)(jsonString)

const replaceQuotationMarks = (text) => pipe(replace(/(?<!\\)"/g, ''), replace(/\\"/g, '"'))(text)

const replaceListOnNewLine = (text) => pipe(replace(/\\- \n{5}/g, '-'))(text)

const fixIndentation = (text) => pipe(replace(/\n{2}/g, '\n'))(text)

const removeFirstLine = (text) => pipe(replace(/[\w\W]+?\n+?/, ''))(text)

const removeEmptyObjects = (text) => pipe(replace(/: {}/g, ''))(text)
