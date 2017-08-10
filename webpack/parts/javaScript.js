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

const BabiliPlugin = require('babili-webpack-plugin');

module.exports.minify = () => ({
  plugins: [
    new BabiliPlugin(),
  ],
});
