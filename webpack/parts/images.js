module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/,
        exclude: /\.inline.svg$/,
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },
});
