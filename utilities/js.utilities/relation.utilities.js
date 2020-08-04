/**
 * Contains utility functions that perform checks on the relationship between
 * its parameters.
 * Examples include: equals, difference, lt, gt, sortBy...
 */
const { difference, differenceWith, flip, gt, gte, lt, lte } = require('ramda/src')

exports.fdifference = flip(difference)
exports.fdifferenceWith = (pred) => (list1) => (list2) => differenceWith(pred, list2, list1)
exports.flt = flip(lt)
exports.flte = flip(lte)
exports.fgt = flip(gt)
exports.fgte = flip(gte)
