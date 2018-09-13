
const path = require('path');
const webpackProd = require('./webpack.prod.config');

var webpackStaging = {
  ...webpackProd
};

webpackStaging.output = {
  filename: '[name].staging.js',
  publicPath: 'https://www.dev.eduid.se/static/front-build/',
  path: path.join(__dirname, 'build')
}

module.exports = webpackStaging;
