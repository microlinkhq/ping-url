'use strict'

const reachableUrl = require('reachable-url')
const memoize = require('@keyvhq/memoize')
const isStream = require('is-stream')
const { omitBy } = require('lodash')

const pingUrl = async (...args) => omitBy(await reachableUrl(...args), isStream)

module.exports = (keyOpts, memoOpts) => memoize(pingUrl, keyOpts, memoOpts)
module.exports.isReachable = reachableUrl.isReachable
