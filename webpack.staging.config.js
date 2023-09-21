const path = require("path");
const webpackProd = require("./webpack.prod.config");
//const initialConfigPlugin = require("./src/init-config").initialConfigPlugin;

var webpackStaging = {
  ...webpackProd,
  devtool: "eval-source-map",
};

webpackStaging.output = {
  filename: "[name].staging.js",
  publicPath: "https://www.dev.eduid.se/static/front-build/",
  path: path.join(__dirname, "build"),
};

webpackStaging.devtool = "source-map";

module.exports = webpackStaging;
