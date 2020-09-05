const base = require('./webpack.base')
const merge = require('lodash/merge')

module.exports = merge(base('production'), {
  mode: 'production'
})
