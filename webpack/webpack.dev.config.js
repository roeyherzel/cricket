const path              = require("path");
const webpack           = require("webpack");
const merge             = require("webpack-merge");
const DashboardPlugin   = require("webpack-dashboard/plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const commonConfig      = require("./webpack.config");

module.exports = merge(commonConfig, {
  devtool: "cheap-eval-source-map",

  plugins: [
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve("src/index.html"),
      minify: { collapseWhitespace: true },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: "[name]__[local]--[hash:base64:5]",
            },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
          "postcss-loader",
        ],
      },
    ],
  },
});
