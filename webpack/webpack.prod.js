const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(base, {
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
});
