// require("dotenv").config({ silent: true });

// const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    app: [
      "react-hot-loader/patch",
      path.resolve("src/index.jsx"),
    ],
  },

  output: {
    path: path.resolve("build"),
    filename: "[name].js",
    chunkFilename: "[name].[chunkhash].js",
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },

  // plugins: [
  //   new webpack.EnvironmentPlugin(["NODE_ENV"]),
  // ],

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
};
