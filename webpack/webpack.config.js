const path = require('path');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  app: path.resolve(__dirname, '../src/App'),
};

module.exports = {
  context: PATHS.src,

  entry: {
    app: [
      'react-hot-loader/patch',
      path.resolve(PATHS.src, 'index.jsx'),
    ],
  },

  output: {
    path: path.resolve('build'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', PATHS.app],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
      },
    ],
  },
};
