module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.inline.svg$/,
        use: [
          'svg-react-loader',
        ],
      },
    ],
  },
});
