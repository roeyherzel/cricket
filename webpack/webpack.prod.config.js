const webpack           = require('webpack');
const path              = require('path');
const merge             = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const commonConfig      = require('./webpack.config');

const extractSass = new ExtractTextPlugin({ filename: 'styles.css', allChunks: true });

module.exports = merge(commonConfig, {
  devtool: 'source-map',

  plugins: [
    extractSass,
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true, minimize: true, comments: false }),
    new HTMLWebpackPlugin({
      template: path.resolve('src/index.html'),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractSass.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader',
        }),
      },
    ],
  },
});
