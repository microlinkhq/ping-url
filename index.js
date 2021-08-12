'use strict'

const { identity, omitBy } = require('lodash')
const reachableUrl = require('reachable-url')
const memoize = require('@keyvhq/memoize')
const isStream = require('is-stream')

const pingUrl = decorate => async (...args) =>
  decorate(omitBy(await reachableUrl(...args), isStream))

module.exports = (keyOpts, { decorate = identity, ...memOpts } = {}) =>
  memoize(pingUrl(decorate), keyOpts, {
    ...memOpts
  })
