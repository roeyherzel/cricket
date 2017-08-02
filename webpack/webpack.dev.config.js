const webpack         = require('webpack');
const merge           = require('webpack-merge');
const DashboardPlugin = require('webpack-dashboard/plugin');
const baseConfig      = require('./webpack.base.config');
const parts           = require('./parts');

const config = {
  devServer: {
    hot: true,
    historyApiFallback: true,
    overlay: {
      errors: true,
      // warnings: true,
    },
  },

  output: {
    // devTools sources - display absolute path to project dir
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
  ],
};

module.exports = merge([
  baseConfig,
  config,
  parts.css.load(),
  parts.javaScript.load(),
  parts.sourcemap('source-map'), // 'eval-source-map'
  parts.images(),
]);
