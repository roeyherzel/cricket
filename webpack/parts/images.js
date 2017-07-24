module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|^(?!.*\.inline\.svg$).*\.svg)$/,
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },
});
