'use strict'

const { identity, omitBy } = require('lodash')
const reachableUrl = require('reachable-url')
const normalizeUrl = require('normalize-url')
const memoize = require('memoized-keyv')
const isStream = require('is-stream')

const pingUrl = decorate => async (...args) =>
  decorate(omitBy(await reachableUrl(...args), isStream))

module.exports = (keyOpts, { decorate = identity, ...memOpts } = {}) =>
  memoize(pingUrl(decorate), keyOpts, {
    resolver: normalizeUrl,
    ...memOpts
  })
