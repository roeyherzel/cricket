const webpack         = require('webpack');
const merge           = require('webpack-merge');
const DashboardPlugin = require('webpack-dashboard/plugin');
const baseConfig      = require('./webpack.base.config');
const parts           = require('./parts');

const devConfig = {
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
  ],
};

module.exports = merge([
  baseConfig,
  devConfig,
  // parts.srcMaps('cheap-eval-source-map'),
  parts.srcMaps('source-map'),
]);
