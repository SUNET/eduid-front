const path = require("path");
const webpackProd = require("./webpack.prod.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpackStaging = {
  ...webpackProd,
  devtool: "eval-source-map",
};

webpackStaging.output = {
  filename: "[name].staging.js",
  publicPath: "https://www.dev.eduid.se/static/front-build/",
  path: path.join(__dirname, "build"),
};

webpackStaging.plugins = [
  //  initialConfigPlugin,
  new HtmlWebpackPlugin({
    hash: true,
    template: `./public/index.html`,
    filename: `index.staging.html`,
    chunks: `index`,
  }),
];
webpackStaging.devtool = "source-map";

module.exports = webpackStaging;
