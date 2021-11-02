const webpack = require("webpack");
const path = require("path");
const autoprefixer = require("autoprefixer");
const precss = require("precss");
const initialConfigPlugin = require("./src/init-config").initialConfigPlugin;
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 9000,
  },
  entry: {
    // To activate the web server, uncomment below 2 lines and
    // add a script to package.json pointing to "webpack-dev-server"
    // WebpackDevServer host and port:
    // server: 'webpack-dev-server/client?http://localhost:8080',
    signup: "./src/entry-points/signup",
    dashboard: "./src/entry-points/dashboard",
    login: "./src/login/app_init/index",
    errors: "./src/entry-points/errors",
  },
  output: {
    path: path.join(__dirname, "build"),
    publicPath: "https://html.eduid.docker/static/front-build/",
    filename: "[name]-bundle.dev.js",
  },
  devtool: "source-map",
  resolve: {
    // allow us to import components in tests like:
    // import Example from 'components/Example';
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    // allow us to avoid including extension name
    extensions: [".js", ".jsx", ".json"],
    mainFields: ["browser", "module", "main"],
  },
  optimization: {
    noEmitOnErrors: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: "json-loader",
      },
      {
        test: /\.scss$/,
        loaders: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=100000",
      },
      {
        test: /\.jpg$/,
        loader: "file-loader",
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream",
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml",
      },
      {
        test: /\.gif$/,
        loader: "file-loader",
      },
      {
        test: require.resolve("es6-promise"),
        loader: "exports-loader",
        options: {
          exports: "global.Promise",
        },
      },
      {
        test: require.resolve("whatwg-fetch"),
        loader: "exports-loader",
        options: {
          exports: "self.fetch",
        },
      },
    ],
  },
  plugins: [
    ...["errors", "login", "dashboard", "signup"].map((entryName) => {
      return new HtmlWebpackPlugin({
        hash: true,
        template: `./public/${entryName}.html`,
        filename: `${entryName}.dev.html`,
        chunks: [`${entryName}`],
      });
    }),
    // Initial configuration
    initialConfigPlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        postcss: function () {
          return [autoprefixer, precss];
        },
      },
    }),
  ],
};
