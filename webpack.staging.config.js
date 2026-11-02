const path = require("node:path");
const webpackProd = require("./webpack.prod.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpackStaging = {
  ...webpackProd,
  devtool: "eval-source-map",
};

webpackStaging.output = {
  filename: "[name].staging.js",
  publicPath: "https://www.dev.eduid.se/static/front-build/",
  path: process.env.LOCAL_BUILDTEST === "1"
    ? path.join(__dirname, "build-release", "staging")
    : path.join(__dirname, "build"),
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
