/**
 * Contains utility functions that perform checks on the type of one or more params.
 * Examples include: is, isNil, type, propIs...
 */

const { either, complement, equals, not, isNil, isEmpty, both, is } = require('ramda/src')

exports.notNil = complement(isNil)
exports.notEmpty = complement(isEmpty)
const isNilOrEmpty = (exports.isNilOrEmpty = either(isNil, isEmpty))
exports.notNilOrEmpty = complement(isNilOrEmpty)
exports.isNumber = both(is(Number), complement(isNaN))
exports.isUndefined = (v) => equals(undefined, v)
exports.notEquals = (a) => (b) => not(equals(a, b)) // complement(equals) has issues with curried function
