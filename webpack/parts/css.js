const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = () => ({
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
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          'postcss-loader',
          'stylefmt-loader',
        ],
      },
    ],
  },

  plugins: [
    new StyleLintPlugin({
      emitErrors: false,
      files: '**/*.css',  // fix globing issue
    }),
  ],
});
