module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/,
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },
});
