const merge = require('webpack-merge');
const common = require('./common.config');

module.exports = merge(common, {
  devtool: 'eval',

  mode: 'development',
});
