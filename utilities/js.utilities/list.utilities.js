/**
 * Contains utility functions that take one or more lists as a parameter
 * and return a new list(s), a comparison or an element of the list(s).
 * Examples include: filter, findIndex, forEach, any...
 */

const {
  without,
  lens,
  view,
  identity,
  complement,
  includes,
  chain,
  zipObj,
  map,
  concat,
  reduce,
  any,
  equals,
  eqProps,
  prop,
  pipe,
  ifElse,
  always,
  mergeAll,
  all,
  zipWith,
  head,
  curry,
  call,
  toPairs,
  of,
  fromPairs,
  flip,
  append,
  addIndex,
  splitAt,
} = require('ramda/src')
const { stringify } = require('./string.utilities')
const { notNil } = require('./type.utilities')
const { isTruthy } = require('./logic.utilities')

exports.allNotNil = all(notNil)
exports.arraySameValue = (arr) => all(equals(head(arr)))(arr)
const andList = (exports.andList = (arr) => all(isTruthy)(arr))
exports.orList = (arr) => any(equals(true))(arr)

exports.valueToArray = (v) => [v]

exports.objectToArray = pipe(toPairs, map(pipe(of, fromPairs)))

exports.arrayToObject = (obj, key) =>
  mergeAll(
    obj.map((o) => ({
      [o[`${key}`]]: o,
    }))
  )

exports.eqTuple = curry((tuple1, tuple2) =>
  ifElse(
    eqProps('length'), // if tuple1 and tuple2 are the same length
    pipe(
      zipWith(equals), // confront the pair
      andList // and return true if all the results are true
    ),
    always(false)
  )(tuple1, tuple2)
)

exports.condTuple = curry((arrFn, tuple) =>
  ifElse(
    eqProps('length'), // if arrFn and tuple are the same length
    pipe(
      zipWith(call), // call each function of each element
      andList // and return true if all the results are true
    ),
    always(false)
  )(arrFn, tuple)
)

/**
 * Makes an object out of a list, with keys derived from each element
 * E.g.:
 * objFromListWith(
 *  R.prop('id'),
 *  [{ id: 'foo', name: 'John' }, { id: 'bar', name: 'Jane' }]
 * )
 * => { foo: { id: 'foo', name: 'John' }, bar: { id: 'bar', name: 'Jane' } }
 */
exports.objFromListWith = curry((fn, list) => chain(zipObj, map(fn))(list))

/**
 * Concats a list of lists
 */
exports.concatAll = reduce(concat, [])

exports.appendTo = flip(append)

exports.indexedReduce = addIndex(reduce)

exports.indexedMap = addIndex(map)

exports.splitIndex = flip(splitAt)

exports.concatBefore = flip(concat)

exports.concatIfTruthy = (cond, toConcat) => (list) => ifElse(identity, () => concat(toConcat, list), always(list))(cond)

const isIncludedIn = (exports.isIncludedIn = flip(includes))

exports.notIncludedIn = complement(isIncludedIn)

exports.isIdIncludedIn = (listWithIds, idLens = lens(identity, identity)) => {
  const listIds = map(view(idLens), listWithIds)
  return pipe(prop('_id'), stringify, isIncludedIn(listIds))
}

exports.withoutRight = flip(without)

exports.chainAnd = (afterFn, chainFn) => (list) => {
  return afterFn(list, chain(chainFn, list))
}
