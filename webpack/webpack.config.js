const path = require('path');
const StyleLintPlugin   = require('stylelint-webpack-plugin');

module.exports = {
  // change webpack root context to src/
  context: path.resolve(__dirname, '../src'),

  entry: {
    app: [
      'react-hot-loader/patch',
      'index.jsx',
    ],
  },

  output: {
    path: path.resolve('build'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', 'src'],
  },

  plugins: [
    new StyleLintPlugin({
      emitErrors: false,
      files: '**/*.css',  // fix globing issue
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
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
          'postcss-loader',
          'stylefmt-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
    ],
  },
};
