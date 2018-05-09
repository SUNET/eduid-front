
const path = require('path');
const webpackProd = require('./webpack.prod.config');

var webpackStaging = {
  ...webpackProd
};

webpackStaging.output = {
  filename: '[name].staging.js',
  publicPath: 'https://dev.eduid.se/static/build/',
  path: path.join(__dirname, 'build')
}

module.exports = webpackStaging;
