'use strict'

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
