'use strict'

const { size, pick } = require('lodash')
const test = require('ava')

const createPingUrl = require('..')

test('cache an URL', async t => {
  const cache = new Map()
  const pingUrl = createPingUrl({ store: cache })
  const targetUrl = 'https://example.com'
  await pingUrl(targetUrl)
  t.true(cache.has(`keyv:${targetUrl}`))
})

test('sort query parameters', async t => {
  const cache = new Map()
  const pingUrl = createPingUrl({ store: cache })

  const targetUrlOne = 'https://example.com/?bar=foo&foo=bar'
  const targetUrlTwo = 'https://example.com/?foo=bar&bar=foo'

  const resOne = await pingUrl(targetUrlOne)
  const resTwo = await pingUrl(targetUrlTwo)

  t.true(resOne.url === resTwo.url)
  t.true(cache.has(`keyv:${targetUrlOne}`))
  t.false(cache.has(`keyv:${targetUrlTwo}`))
})

test('unencoded URL', async t => {
  const cache = new Map()
  const pingUrl = createPingUrl({ store: cache })
  const targetUrl =
    'https://medium.com/@Acegikmo/the-ever-so-lovely-bézier-curve-eb27514da3bf'

  const value = await pingUrl(targetUrl)
  t.is(
    value.url,
    'https://medium.com/@Acegikmo/the-ever-so-lovely-b%C3%A9zier-curve-eb27514da3bf'
  )
})

test('follows redirects', async t => {
  const cache = new Map()
  const pingUrl = createPingUrl({ store: cache })

  const value = await pingUrl('https://google.com')
  t.is(value.url, 'https://www.google.com/')
})

test('decorate support', async t => {
  const cache = new Map()
  const pingUrl = createPingUrl(
    { store: cache },
    { decorate: value => pick(value, ['url']) }
  )
  const value = await pingUrl('https://google.com')
  t.is(value.url, 'https://www.google.com/')
  t.is(size(value), 1)
})
