const path = require("path");
const webpackProd = require("./webpack.prod.config");

var webpackStaging = {
  ...webpackProd
};

webpackStaging.output = {
  filename: "[name].staging.js",
  publicPath: "/static/front-build/",
  path: path.join(__dirname, "build")
};

webpackStaging.devtool = "source-map";

module.exports = webpackStaging;
