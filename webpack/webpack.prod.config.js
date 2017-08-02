const merge              = require('webpack-merge');
const path               = require('path');
const baseConfig         = require('./webpack.base.config');
const parts              = require('./parts');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  performance: {
    hints: 'warning', // 'error' or false are valid too
    maxEntrypointSize: 100000, // in bytes
    maxAssetSize: 450000, // in bytes
  },

  output: {
    path: path.resolve('build'),
    chunkFilename: '[name].[chunkhash:8].js',
    filename: '[name].[chunkhash:8].js',
    // Match GitHub project name
    publicPath: '/cricket/',
  },

  plugins: [
    new CleanWebpackPlugin('build', {
      root: path.resolve(__dirname, '../'),
    }),
  ],
};

module.exports = merge([
  baseConfig,
  config,
  parts.css.extract(),
  parts.javaScript.load(),
  parts.javaScript.minify(),
  parts.sourcemap('source-map'),
  parts.images({
    limit: 15000,
    name: '[name].[hash:8].[ext]',
  }),
]);
