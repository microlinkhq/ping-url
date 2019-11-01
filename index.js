'use strict'

const reachableUrl = require('reachable-url')
const normalizeUrl = require('normalize-url')
const memoize = require('memoized-keyv')
const isStream = require('is-stream')
const pReflect = require('p-reflect')
const { omitBy } = require('lodash')

const pingUrl = async (...args) => {
  const { value, ...result } = await pReflect(reachableUrl(...args))
  const sanetizeValue = omitBy(value, isStream)
  return { ...result, value: sanetizeValue }
}

module.exports = (keyOpts, memOpts) =>
  memoize(pingUrl, keyOpts, {
    resolver: normalizeUrl,
    ...memOpts
  })
