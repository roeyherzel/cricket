module.exports.css        = require('./css');
module.exports.javaScript = require('./javaScript');
module.exports.images     = require('./images');

module.exports.sourcemap = (type) => ({devtool: type});
