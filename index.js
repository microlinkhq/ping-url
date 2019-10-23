'use strict'

const reachableUrl = require('reachable-url')
const normalizeUrl = require('normalize-url')
const memoize = require('memoized-keyv')
const isStream = require('is-stream')
const pReflect = require('p-reflect')
const { omitBy } = require('lodash')
const Keyv = require('keyv')

const pingUrl = async (...args) => {
  const { value, ...result } = await pReflect(reachableUrl(...args))
  const sanetizeValue = omitBy(value, isStream)
  return { ...result, ...sanetizeValue }
}

module.exports = opts =>
  memoize(pingUrl, new Keyv(opts), {
    resolver: normalizeUrl
  })
