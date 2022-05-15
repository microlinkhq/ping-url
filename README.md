<div align="center">
  <img src="https://cdn.microlink.io/logo/banner.png" alt="microlink">
  <br>
  <br>
</div>

![Last version](https://img.shields.io/github/tag/microlinkhq/ping-url.svg?style=flat-square)
[![Coverage Status](https://img.shields.io/coveralls/microlinkhq/ping-url.svg?style=flat-square)](https://coveralls.io/github/microlinkhq/ping-url)
[![NPM Status](https://img.shields.io/npm/dm/@microlink/ping-url.svg?style=flat-square)](https://www.npmjs.org/package/@microlink/ping-url)

> Fast DNS resolution caching results for a while.

## Motivation

Ping an URL for getting the canonical URL and store the result into a cache, respecting a Time-to-Live (*TTL*) for the next lookup.

Suggested TTL could be:

- **Very Short**: 300 seconds (5 minutes).
- **Short**: 3600 seconds (1 hour).
- **Long**: 86400 seconds (24 hours).
- **Insanity**: 604800 seconds (7 days).

This library support any data storage provided by [`keyv`](https://npm.im/keyv).

## Install

```bash
$ npm install @microlink/ping-url --save
```

## Usage

```js
const createPingUrl = require('@microlink/ping-url')
const cache = new Map()
const pingUrl = createPingUrl({ store: cache, ttl: 3600 })

;(async () => {
  await pingUrl('https://example.com') // MISS, do the request
  await pingUrl('https://example.com') // HIT, serve from cache!
})()
```

The payload returned by `pingUrl` will be `response` but without any stream object there.

## API

### createPingUrl([keyvOptions], [memoOpts]) → pingUrl(url, [gotOpts])

#### keyvOptions

See [`keyv#options`](https://www.npmjs.com/package/keyv#new-keyvuri-options).

#### memoOpts

See [`@keyvhq/memoize`](https://github.com/microlinkhq/keyv/tree/master/packages/memoize).

#### gotOpts

Type: `object`

Any option provided here will passed to [got#options](https://github.com/sindresorhus/got#options).

## License

**@microlink/ping-url** © [Microlink](https://microlink.io), released under the [MIT](https://github.com/microlink/ping-url/blob/master/LICENSE.md) License.<br>
Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/microlink/ping-url/contributors).

> [microlink.io](https://microlink.io) · GitHub [microlinkhq](https://github.com/microlinkhq) · Twitter [@microlinkhq](https://twitter.com/microlinkhq)
