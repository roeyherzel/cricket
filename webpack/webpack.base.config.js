const merge             = require('webpack-merge');
const path              = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const parts             = require('./parts');

const base = {
  // change webpack root context to src/
  context: path.resolve(__dirname, '../src'),

  entry: {
    app: [
      'react-hot-loader/patch',
      'index.jsx',
    ],
  },

  output: {
    path: path.resolve('build'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', 'src'],
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: 'index.html',
    }),
  ],
};

module.exports = merge([
  base,
  parts.css(),
  parts.javaScript(),
  parts.images(),
  parts.svg(),
]);
