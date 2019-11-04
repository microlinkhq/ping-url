'use strict'

const { identity, omitBy } = require('lodash')
const reachableUrl = require('reachable-url')
const normalizeUrl = require('normalize-url')
const memoize = require('memoized-keyv')
const isStream = require('is-stream')
const pReflect = require('p-reflect')

const pingUrl = decorate => async (...args) => {
  const { value: rawValue, ...result } = await pReflect(reachableUrl(...args))
  const value = decorate(omitBy(rawValue, isStream))
  return { ...result, value }
}

module.exports = (keyOpts, { decorate = identity, ...memOpts } = {}) =>
  memoize(pingUrl(decorate), keyOpts, {
    resolver: normalizeUrl,
    ...memOpts
  })
