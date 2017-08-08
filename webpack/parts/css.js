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

module.exports.extract = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
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

module.exports.load = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
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
