const path              = require("path");
const webpack           = require("webpack");
const DashboardPlugin   = require("webpack-dashboard/plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const config            = require("./webpack.config");

module.exports = {
  devtool: "cheap-eval-source-map",

  entry: {
    app: [
      "react-hot-loader/patch",
      ...config.entry.app,
    ],
  },

  resolve: config.resolve,

  output: config.output,

  plugins: [
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve("src/index.html"),
      minify: { collapseWhitespace: true },
    }),
    ...config.plugins,
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

      ...config.module.rules,
    ],
  },
};
