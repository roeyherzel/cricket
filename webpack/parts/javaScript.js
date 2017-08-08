module.exports.load = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include,
        exclude,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // Enable caching for improved performance during
              // development.
              // It uses default OS directory by default. If you need
              // something more custom, pass a path to it.
              // I.e., { cacheDirectory: '<path>' }
              cacheDirectory: true,
            },
          },
          'eslint-loader',
        ],
      },
    ],
  },
});

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports.minify = ({ include, exclude } = {}) => ({
  plugins: [
    new UglifyJSPlugin({
      include,
      exclude,
      test: /\.(js|jsx)$/,
    }),
  ],
});
