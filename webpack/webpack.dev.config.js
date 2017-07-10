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
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
});
