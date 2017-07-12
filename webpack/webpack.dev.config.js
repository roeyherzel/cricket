const path              = require('path');
const webpack           = require('webpack');
const merge             = require('webpack-merge');
const DashboardPlugin   = require('webpack-dashboard/plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin   = require('stylelint-webpack-plugin');
const commonConfig      = require('./webpack.config');

module.exports = merge(commonConfig, {
  devtool: 'cheap-eval-source-map',

  devServer: {
    historyApiFallback: true,
    overlay: {
      errors: true,
      // warnings: true,
    },
  },

  plugins: [
    new StyleLintPlugin({
      emitErrors: false,
    }),
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve('src/index.html'),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: true,
              localIdentName: '[folder]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
          'postcss-loader',
          'stylefmt-loader',
        ],
      },
    ],
  },
});
