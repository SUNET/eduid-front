const path = require("path");
const webpackProd = require("./webpack.prod.config");

var webpackStaging = {
  ...webpackProd
};

webpackStaging.output = {
  filename: ({ chunk: { name } }) => { return name ===  "errors" ? "[name]-bundle.staging.js" :"[name].staging.js"},
  publicPath: "https://www.dev.eduid.se/static/front-build/",
  path: path.join(__dirname, "build")
};

webpackStaging.devtool = "source-map";

module.exports = webpackStaging;
