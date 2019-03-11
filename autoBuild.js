'use strict'

const http           = require('http')

const webhookHandler = require('./lib/webhookHandler')
const config         = require('./config.js')

let handler = webhookHandler.create(config)

http.createServer((req, res) => {
    webhookHandler.server(handler, req, res)
}).listen(7777)

webhookHandler.loadPushEvent(handler)
webhookHandler.loadErrorEvent(handler)

