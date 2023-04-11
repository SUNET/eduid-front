const path = require("path");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const CompressionPlugin = require("compression-webpack-plugin");
//const initialConfigPlugin = require("./src/init-config").initialConfigPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");

var webpackProd = {
  entry: webpackConfig.entry,
  resolve: webpackConfig.resolve,
  module: webpackConfig.module,
};

delete webpackProd.entry.server;
delete webpackProd.entry.hot;

//webpackProd.devtool = 'inline-source-map';
delete webpackProd.devtool;

webpackProd.output = {
  filename: "[name].js",
  publicPath: "https://www.eduid.se/static/front-build/",
  path: path.join(__dirname, "build"),
};

webpackProd.plugins = [
  //  initialConfigPlugin,
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production"),
    },
  }),
  new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
  new CompressionPlugin(),
  ...["help", "errors", "login", "dashboard", "signup"].map((entryName) => {
    return new HtmlWebpackPlugin({
      hash: true,
      template: `./public/${entryName}.html`,
      filename: `${entryName}.html`,
      chunks: [`${entryName}`],
    });
  }),
];

webpackProd.mode = "production";

webpackProd.performance = {
  hints: false,
};

module.exports = webpackProd;
