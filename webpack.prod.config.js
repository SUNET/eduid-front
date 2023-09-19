const path = require("path");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const CompressionPlugin = require("compression-webpack-plugin");
//const initialConfigPlugin = require("./src/init-config").initialConfigPlugin;

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
  new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
  new CompressionPlugin(),
<<<<<<< HEAD
=======
  ...["faq", "errors", "index", "dashboard", "signup"].map((entryName) => {
    return new HtmlWebpackPlugin({
      hash: true,
      template: `./public/${entryName}.html`,
      filename: `${entryName}.html`,
      chunks: [`${entryName}`],
    });
  }),
>>>>>>> 46b4f6c02 (login.html -> index.html)
];

webpackProd.mode = "production";

webpackProd.performance = {
  hints: false,
};

module.exports = webpackProd;
