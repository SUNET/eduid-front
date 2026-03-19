const path = require("path");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpackProd = {
  entry: webpackConfig.entry,
  resolve: webpackConfig.resolve,
  module: webpackConfig.module,
};

delete webpackProd.entry.server;
delete webpackProd.entry.hot;

delete webpackProd.devtool;

webpackProd.output = {
  filename: "[name].js",
  publicPath: "https://www.eduid.se/static/front-build/",
  path: path.join(__dirname, "build"),
};

webpackProd.plugins = [
  //  initialConfigPlugin,
  new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
  new CompressionPlugin(),
  new HtmlWebpackPlugin({
    hash: true,
    template: `./public/index.html`,
    filename: `index.html`,
    chunks: `index`,
  }),
];

webpackProd.mode = "production";

webpackProd.performance = {
  hints: false,
};

module.exports = webpackProd;
