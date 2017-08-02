const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports.load = () => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
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

module.exports.minify = () => ({
  plugins: [
    new UglifyJSPlugin({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
    }),
  ],
});
