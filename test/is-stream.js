'use strict'

const Stream = require('node:stream')
const http = require('node:http')
const net = require('node:net')
const fs = require('node:fs')
const test = require('ava')

const { isStream } = require('..')

test('is-stream', t => {
  t.true(isStream(new Stream.Stream()))
  t.true(isStream(new Stream.Readable()))
  t.true(isStream(new Stream.Writable()))
  t.true(isStream(new Stream.Duplex()))
  t.true(isStream(new Stream.Transform()))
  t.true(isStream(new Stream.PassThrough()))
  t.true(isStream(fs.createReadStream('./index.js')))
  t.true(isStream(new http.OutgoingMessage()))
  t.true(isStream(new http.IncomingMessage()))
  t.true(isStream(new http.ServerResponse({})))
  t.true(isStream(new http.ClientRequest('http://example.com')))
  t.true(isStream(new net.Socket()))
  t.false(isStream({}))
  t.false(isStream(null))
  t.false(isStream(undefined))
  t.false(isStream(''))
})
