const {
  replace,
  pipe,
  forEach,
  pick,
  prop,
  mergeDeepLeft,
  mergeAll,
  concat,
  assoc,
  path,
  reduce,
  prepend,
  pathOr,
  toLower,
  propOr,
  map,
} = require('ramda/src')
const { dictionaryToTupleList, arrayToObject, valueToArray } = require('../js.utilities')

const getMapWithNameVariableAndValue = reduce((acc, variable) => {
  const { name, values } = variable
  forEach((value) => acc.set(value, name), values)
  return acc
}, new Map())

exports.replaceLikeFrontend = (val, name) => `\${${name}=${val}}`

exports.replaceMdStyle = (val, name) => `[${name}](${val})`

exports.replaceWithBraces = (val, name) => `{${name}}`

exports.replaceDialogflowParameterStyle = (val, name) => `$${name}`

// #todo this should be case insensitive
exports.formatTextWithVariable = (text, variables, replaceFunc) => {
  const textLowerCase = toLower(text)
  return pipe(
    getMapWithNameVariableAndValue,
    Array.from,
    reduce((acc, [val, name]) => {
      const valLowerCase = toLower(val)
      return replace(valLowerCase, replaceFunc(val, name, prepend), acc)
    }, textLowerCase)
  )(variables)
}

exports.replaceDialogflowContextParameterStyle = (name, prepend = '') => `#${prepend}.${name}`

exports.findVariablesInText = (variables) => (text) => reduce((acc, variable) => [...acc, ...searchVariableInText(text, variable)], [])(variables)

/**
 * #refactor Use FP
 * This method checks that the word is between puncuation or spaces
 */
exports.getVariableInfoInsideText = (text, variable) => {
  const found = []
  variable.values.forEach((value) => {
    let searchPosition = text.toLowerCase().indexOf(value.toLowerCase())
    while (searchPosition > -1) {
      let searchPositionEnd = searchPosition + (value.length - 1)
      if (searchPosition !== -1 && checkIfValidWord(text, searchPosition, searchPositionEnd)) {
        found.push({ startPosition: searchPosition, endPosition: searchPositionEnd, variableId: variable._id })
      }
      searchPosition = text.toLowerCase().indexOf(value.toLowerCase(), searchPosition + 1)
    }
  })
  return found
}

/**
 * #refactor Use FP
 * This method checks that the word is between puncuation or spaces
 */
const searchVariableInText = (text, variable) => {
  const found = []
  variable.values.forEach((value) => {
    let searchPosition = text.toLowerCase().indexOf(value.toLowerCase())
    while (searchPosition > -1) {
      let searchPositionEnd = searchPosition + (value.length - 1)
      if (searchPosition !== -1 && checkIfValidWord(text, searchPosition, searchPositionEnd)) {
        found.push(variable._id)
      }
      searchPosition = text.toLowerCase().indexOf(value.toLowerCase(), searchPosition + 1)
    }
  })
  return found
}

/**
 * #refactor Use FP
 */
const checkIfValidWord = (text, wordPosition, wordPositionEnd) => {
  const punctuation = [':', ';', '!', '?', '.', ',', '(', '{', ')', '}', '[', ']', '"', "'"]
  let wordPositionLeftCounter = wordPosition - 1
  let wordValidLeftChars = true
  while (wordPositionLeftCounter >= 0) {
    const currentChar = text.charAt(wordPositionLeftCounter).trim()
    if (currentChar === '' || currentChar === '\t' || currentChar === '\n' || currentChar === '\r') {
      break
    } else if (!punctuation.includes(currentChar)) {
      wordValidLeftChars = false
      break
    }
    wordPositionLeftCounter--
  }
  let wordPositionRightCounter = wordPositionEnd + 1
  let wordValidRightChars = true
  while (wordPositionRightCounter <= text.length) {
    const currentChar = text.charAt(wordPositionRightCounter).trim()
    if (currentChar === '' || currentChar === '\t' || currentChar === '\n' || currentChar === '\r') {
      break
    } else if (!punctuation.includes(currentChar)) {
      wordValidRightChars = false
      break
    }
    wordPositionRightCounter++
  }
  return wordValidLeftChars && wordValidRightChars
}

exports.getVariablesInfo = (variables, vartypes) => {
  const typesGroupedById = arrayToObject(vartypes, '_id')
  return reduce((acc, variable) => {
    const variableVarTypes = pipe(
      propOr({}, 'vartypes'),
      dictionaryToTupleList,
      map(([platform, typeId]) => ({ [platform]: pathOr(typeId, [typeId, 'name'], typesGroupedById) })),
      mergeAll
    )(variable)
    const newVarTypes = pipe(prop('defaultVartypes'), mergeDeepLeft(variableVarTypes))(variable)
    return pipe(pick(['_id', 'values', 'name']), assoc('vartypes', newVarTypes), valueToArray, concat(acc))(variable)
  }, [])(variables)
}

exports.getVartypeForPlatform = (platform) => (variableInfo) => path(['vartypes', platform], variableInfo)
