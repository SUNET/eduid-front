const path = require("path");
const webpackProd = require("./webpack.prod.config");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const initialConfigPlugin = require("./src/init-config").initialConfigPlugin;

var webpackStaging = {
  ...webpackProd
};

webpackStaging.output = {
  filename: "[name]-bundle.staging.js",
  publicPath: "https://www.dev.eduid.se/static/front-build/",
  path: path.join(__dirname, "build")
};

webpackStaging.plugins = [
  initialConfigPlugin,
  ...["errors", "login", "dashboard", "signup"].map((entryName) =>{
    return new HtmlWebpackPlugin({
      hash: true,
      template: `./public/${entryName}.html`,
      filename: `${entryName}.dev.html`,
      chunks: [`${entryName}`]
    })
  })
];


webpackStaging.devtool = "source-map";

module.exports = webpackStaging;
