const path = require("path");
const webpackProd = require("./webpack.prod.config");
const HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackStaging = {
  ...webpackProd
};

webpackStaging.output = {
  filename: ({ chunk: { name } }) => { return name ===  "errors" ? "[name]-bundle.staging.js" :"[name].staging.js"},
  publicPath: "https://www.dev.eduid.se/static/front-build/",
  path: path.join(__dirname, "build")
};

webpackStaging.plugins = [
  new HtmlWebpackPlugin({
    hash: true,
    template: "./public/errors.html",
    filename: "errors.staging.html",
    chunks: ["errors"]
  })
];


webpackStaging.devtool = "source-map";

module.exports = webpackStaging;
