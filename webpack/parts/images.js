module.exports = ({ options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg)$/,
        exclude: /\.inline.svg$/,
        use: {
          loader: 'url-loader',
          options,
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
