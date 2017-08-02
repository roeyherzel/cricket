const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const linterPlugin = new StyleLintPlugin({
  emitErrors: false,
  files: '**/*.css',  // Fix globing issue
});

// Output extracted CSS to a file
const extractPlugin = new ExtractTextPlugin({
  filename: '[name].[contenthash:8].css',
});

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
    importLoaders: 1,
    modules: true,
    localIdentName: '[name]__[local]___[hash:base64:5]',
  },
};

module.exports.extract = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractPlugin.extract({
          use: [
            cssLoader,
            'postcss-loader',
            'stylefmt-loader',
          ],
          fallback: 'style-loader',
        }),
      },
    ],
  },
  plugins: [extractPlugin, linterPlugin],
});

module.exports.load = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          cssLoader,
          'postcss-loader',
          'stylefmt-loader',
        ],
      },
    ],
  },
  plugins: [linterPlugin],
});
