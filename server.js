require('babel-core/register')

const path = require('path')
const express = require('express')
const webpack = require('webpack')
const dev = require('webpack-dev-middleware')
const hot = require('webpack-hot-middleware')
const config = require('./webpack.config.js')

const port = process.env.PORT || 3050
const server = express()
global.__ENVIRONMENT__ = process.env.NODE_ENV || 'default'

// Otherwise errors thrown in Promise routines will be silently swallowed.
// (e.g. any error during rendering the app server-side!)
process.on('unhandledRejection', (reason, p) => {
  if (reason.stack) {
    console.error(reason.stack)
  } else {
    console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason)
  }
})

server.get('/favicon.ico', function(req, res) {
  res.writeHead(200, { 'Content-Type': 'image/x-icon' })
  res.end()
})

server.use(express.static(path.resolve(__dirname, 'dist')))
server.use('/assets', express.static('assets'))

if (!process.env.NODE_ENV) {
  const compiler = webpack(config)

  server.use(dev(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }))
  server.use(hot(compiler))
}

server.get('/gps', require('./app').serverMiddleware)
server.get('/', require('./app').serverMiddleware)

server.listen(port, (err) => {
  if (err) console.error(err)
  console.info(`⚡⚡⚡ Server running on http://localhost:${port}/`)
})
