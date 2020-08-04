/**
 * Contains utility functions that take one or more objects as a parameter and
 * perform actions on it.
 * Examples include: merge, pick, where, set...
 */

const {
  always,
  merge,
  mergeRight,
  assocPath,
  evolve,
  map,
  when,
  propEq,
  ifElse,
  pipe,
  defaultTo,
  identity,
  __,
  path,
  isNil,
  filter,
  equals,
  is,
  prop,
  curry,
  juxt,
  omit,
  pick,
  flip,
  reverse,
  includes,
  reduce,
  assoc,
  cond,
  keys,
  T,
} = require('ramda/src')

const fprop = (exports.fprop = flip(prop))

exports.pickAndOmitProps = curry((propNames, obj) => juxt([pick(propNames), omit(propNames)])(obj))

exports.renameKeys = curry((keysMap, obj) =>
  pipe(
    keys, // reduce over keys of obj
    reduce(
      (acc, key) =>
        pipe(
          fprop(keysMap), // get keysMap[key]
          defaultTo(key), // or key if it doesn't exist
          assoc(__, prop(key, obj), acc) // set key in return obj
        )(key),
      {}
    )
  )(obj)
)

exports.assocValue = curry((k, o, v) => assoc(k, v, o))

exports.assocValueIf = curry((fCond, key, obj, value) => ifElse(fCond, assoc(key, __, obj), always(obj))(value))

exports.assocIf = curry((fCond, key, value, obj) => ifElse(fCond, assoc(key, value, __), always(obj))(obj))

const assocPathValue = (exports.assocPathValue = curry((path, obj, value) => assocPath(path, value, obj)))

exports.assocPathIf = curry((fCond, path, value, obj) => ifElse(fCond, assocPathValue(path, obj), always(obj))(value))

exports.assocUnless = curry((fCond, key, obj, value) => ifElse(fCond, always(obj), assoc(key, __, obj))(value))

/**
 * Transform N values already inside an object. If the object does not have the specified properties,
 * it is first initialized with the values in defaultObj.
 */
exports.evolveAssoc = curry((defaultObj, transformValues, obj) => pipe(merge(defaultObj), evolve(transformValues))(obj))

const evolveObj = (exports.evolveObj = (obj) => (transformations) => evolve(transformations, obj))

const evolveEach = (exports.evolveEach = (transformFn) => (obj) =>
  pipe(
    keys,
    reduce((acc, k) => mergeRight(acc, { [k]: transformFn }), {}),
    evolveObj(obj)
  )(obj))

exports.evolveProps = (props, transformFn) => (obj) =>
  pipe(
    keys,
    filter(includes(__, props)),
    (a) => a,
    reduce((acc, k) => mergeRight(acc, { [k]: transformFn }), {}),
    evolveObj(obj)
  )(obj)

const omitDeepArray = (props) => (arr) => map(omitDeep(props))(arr)

const omitDeepObject = (props) => (obj) => pipe(omit(props), evolveEach(omitDeep(props)))(obj)

const omitDeep = (exports.omitDeep = (props) => (obj) =>
  cond([
    [is(Array), omitDeepArray(props)],
    [is(Function), identity],
    [is(Object), omitDeepObject(props)],
    [T, identity],
  ])(obj))

exports.dictionaryToTupleList = (dict) =>
  pipe(
    keys,
    reduce((acc, key) => {
      const item = dict[key]
      return item ? [...acc, [key, item]] : acc
    }, [])
  )(dict)

exports.reverseObj = (obj) =>
  pipe(
    keys,
    reverse,
    reduce((acc, k) => mergeRight(acc, { [k]: obj[k] }), {})
  )(obj)

const replaceNotEqualDictionaryKey = (obj, fieldPath, oldDictionaryKey, newDictionaryKey) => {
  const oldValue = path([...fieldPath, oldDictionaryKey], obj)
  const replaceOldValue = pipe(assocPath([...fieldPath, newDictionaryKey], oldValue), omitDeep([oldDictionaryKey]))
  return ifElse(isNil, always(obj), () => replaceOldValue(obj))(oldValue)
}

const replaceDictionaryKey = (exports.replaceDictionaryKey = (fieldPath, oldDictionaryKey, newDictionaryKey) => (obj) =>
  ifElse(equals, always(obj), () => replaceNotEqualDictionaryKey(obj, fieldPath, oldDictionaryKey, newDictionaryKey))(
    oldDictionaryKey,
    newDictionaryKey
  ))

exports.replaceDictionaryKeyArray = (fieldPath, oldProp, newProp) =>
  // Given an array of objects
  map(replaceDictionaryKey(fieldPath, oldProp, newProp))

const replaceObjectProperty = (field, oldValue, newValue) => (object) => when(propEq(field, oldValue), assoc(field, newValue), object)

exports.replaceObjectPropertyInArray = (field, oldValue, newValue, items) => map(replaceObjectProperty(field, oldValue, newValue), items)
