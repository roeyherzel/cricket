const path                       = require('path');
const HTMLWebpackPlugin          = require('html-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const FaviconsWebpackPlugin      = require('favicons-webpack-plugin');

module.exports = {
  // change webpack root context to src/
  context: path.resolve(__dirname, '../src'),

  entry: {
    app: [
      'react-hot-loader/patch',
      'index.jsx',
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
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
    }),
  ],
};
