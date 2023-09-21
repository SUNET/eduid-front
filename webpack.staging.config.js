const path = require("path");
const webpackProd = require("./webpack.prod.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
<<<<<<< HEAD
=======

webpackStaging.plugins = [
  //  initialConfigPlugin,
  ...["index"].map((entryName) => {
    return new HtmlWebpackPlugin({
      hash: true,
      template: `./public/${entryName}.html`,
      filename: `${entryName}.staging.html`,
      chunks: [`${entryName}`],
    });
  }),
];

>>>>>>> ed05e39d2 (Changed  onClick to Link to avoid fetching JS script for help page)
webpackStaging.devtool = "source-map";

module.exports = webpackStaging;
