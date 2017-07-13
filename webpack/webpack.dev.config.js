const webpack           = require('webpack');
const merge             = require('webpack-merge');
const DashboardPlugin   = require('webpack-dashboard/plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const commonConfig      = require('./webpack.config');

module.exports = merge(commonConfig, {
  devtool: 'cheap-eval-source-map',
  // devtool: 'source-map',

  devServer: {
    hot: true,
    historyApiFallback: true,
    overlay: {
      errors: true,
      // warnings: true,
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
    new HTMLWebpackPlugin({
      template: 'index.html',
    }),
  ],
});
