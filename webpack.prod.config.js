const path = require("path");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const initialConfigPlugin = require("./src/init-config").initialConfigPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var webpackProd = {
  entry: webpackConfig.entry,
  resolve: webpackConfig.resolve,
  module: webpackConfig.module
};

delete webpackProd.entry.server;
delete webpackProd.entry.hot;

//webpackProd.devtool = 'inline-source-map';
delete webpackProd.devtool;

webpackProd.output = {
  filename: "[name].js",
  publicPath: "https://www.eduid.se/static/front-build/",
  path: path.join(__dirname, "build")
};

webpackProd.plugins = [
  initialConfigPlugin,
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    }
  }),
  new webpack.ProvidePlugin({
    Promise: "exports-loader?global.Promise!es6-promise",
    "window.fetch": "exports-loader?self.fetch!whatwg-fetch"
  }),
  new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
  new webpack.optimize.OccurrenceOrderPlugin(true),
  new CompressionPlugin({
    filename: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  }),
  // new BundleAnalyzerPlugin()
];

webpackProd.mode = 'production';

webpackProd.optimization = {
  minimizer: [
    new UglifyJsPlugin()
  ]
};

module.exports = webpackProd;
