module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/,
        exclude: /\.inline.svg$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[hash].[ext]',
        },
      },
      {
        test: /\.inline.svg$/,
        use: {
          loader: 'svg-react-loader',
        },
      },
    ],
  },
});
