const merge                      = require('webpack-merge');
const HTMLWebpackPlugin          = require('html-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const FaviconsWebpackPlugin      = require('favicons-webpack-plugin');
const path                       = require('path');
const parts                      = require('./parts');
const PATHS                      = require('./paths');

const baseConfig = {
  // change webpack root context to src/
  context: PATHS.src,

  entry: {
    app: [
      'react-hot-loader/patch',
      'index.jsx',
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: ['node_modules', 'src'],
  },

  plugins: [
    new WebpackBuildNotifierPlugin({
      suppressWarning: true,
      sound: false,
    }),

    new HTMLWebpackPlugin({
      template: 'index.html',
    }),

    new FaviconsWebpackPlugin({
      title: 'Cricket Darts',
      logo: 'images/dart.png',
      emitStats: true,
    }),
  ],
};

module.exports = merge([
  baseConfig,
  parts.images(),
  parts.sourcemap('source-map'), // 'eval-source-map'
  parts.javaScript.load({include: PATHS.src}),
]);
