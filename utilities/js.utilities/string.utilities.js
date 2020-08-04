/**
 * Contains utility functions on strings.
 * Examples include: toString, match, replace, trim...
 */

const { is, unless, toString } = require('ramda/src')

exports.stringify = unless(is(String), toString)
