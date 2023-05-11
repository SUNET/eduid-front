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

<<<<<<< HEAD
=======
webpackStaging.plugins = [
  //  initialConfigPlugin,
  ...["faq", "errors", "index", "dashboard", "signup"].map((entryName) => {
    return new HtmlWebpackPlugin({
      hash: true,
      template: `./public/${entryName}.html`,
      filename: `${entryName}.staging.html`,
      chunks: [`${entryName}`],
    });
  }),
];

>>>>>>> d44d1b9e4 (Bye, errors)
webpackStaging.devtool = "source-map";

module.exports = webpackStaging;
