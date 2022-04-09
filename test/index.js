'use strict'

const test = require('ava')

const createPingUrl = require('..')

test('cache an URL', async t => {
  const cache = new Map()
  const pingUrl = createPingUrl({ store: cache })
  const targetUrl = 'https://example.com'
  await pingUrl(targetUrl)
  t.true(cache.has(targetUrl))
})

test('default key is the url', async t => {
  const cache = new Map()
  const pingUrl = createPingUrl({ store: cache })

  const targetUrlOne = 'https://example.com/?bar=foo&foo=bar'
  const targetUrlTwo = 'https://example.com/?foo=bar&bar=foo'

  await pingUrl(targetUrlOne)
  await pingUrl(targetUrlTwo)

  t.is(cache.size, 2)
})

test('decoded URL', async t => {
  const cache = new Map()
  const pingUrl = createPingUrl({ store: cache })
  const targetUrl =
    'https://acegikmo.medium.com/the-ever-so-lovely-bézier-curve-eb27514da3bf'

  const value = await pingUrl(targetUrl)
  t.is(
    value.url,
    'https://acegikmo.medium.com/the-ever-so-lovely-b%C3%A9zier-curve-eb27514da3bf'
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
  const pingUrl = createPingUrl({ store: cache }, { value: ({ url }) => url })
  const value = await pingUrl('https://google.com')
  t.is(value, 'https://www.google.com/')
})
