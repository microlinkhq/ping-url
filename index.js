'use strict'

const reachableUrl = require('reachable-url')
const memoize = require('@keyvhq/memoize')
const { omitBy } = require('lodash')

const isStream = input => input != null && typeof input.pipe === 'function'

const pingUrl = async (...args) => omitBy(await reachableUrl(...args), isStream)

module.exports = (keyOpts, memoOpts) => memoize(pingUrl, keyOpts, memoOpts)
module.exports.isReachable = reachableUrl.isReachable
module.exports.isStream = isStream
