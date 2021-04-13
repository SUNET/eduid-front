const path = require("path");
const webpackProd = require("./webpack.prod.config");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const initialConfigPlugin = require("./src/init-config").initialConfigPlugin;

var webpackStaging = {
  ...webpackProd
};

webpackStaging.output = {
  filename: ({ chunk: { name } }) => { return name ===  "errors" ? "[name]-bundle.staging.js" :"[name].staging.js"},
  publicPath: "https://www.dev.eduid.se/static/front-build/",
  path: path.join(__dirname, "build")
};

webpackStaging.plugins = [
  initialConfigPlugin,
  new HtmlWebpackPlugin({
    hash: true,
    template: "./public/errors.html",
    filename: "errors.staging.html",
    chunks: ["errors"]
  })
];


webpackStaging.devtool = "source-map";

module.exports = webpackStaging;
