const webpack = require("webpack");
const path = require("node:path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// You can leverage your IDE's Intellisense (autocompletion, type check, etc.) with the helper function `defineReactCompilerLoaderOption`:
const { defineReactCompilerLoaderOption, reactCompilerLoader } = require('react-compiler-webpack');


module.exports = {
  mode: "development",
  entry: {
    index: "./src/entry-points/index",
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
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    mainFields: ["browser", "module", "main"],
  },
  optimization: {
    emitOnErrors: false,
  },
  module: {
    rules: [
      {
        test: /\.[mc]?[jt]sx?$/i,
        exclude: /node_modules/,
        use: [
          // babel-loader, swc-loader, esbuild-loader, or anything you like to transpile JSX should go here.
          // If you are using rspack, the rspack's buiilt-in react transformation is sufficient.
          // { loader: 'swc-loader' },
          // Now add reactCompilerLoader
          {
            loader: reactCompilerLoader,
            options: defineReactCompilerLoaderOption({
              // React Compiler options goes here
            })
          }
        ]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: [{ loader: "ts-loader" }],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", { loader: "css-loader", options: { import: false } }, "postcss-loader"],
      },
      {
        test: /\.(gif|jpg|png)$/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
        //loader: "url-loader?limit=10000&mimetype=application/font-woff",
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
        //loader: "url-loader?limit=10000&mimetype=application/octet-stream",
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
        //loader: "url-loader?limit=10000&mimetype=image/svg+xml",
      },
    ],
  },
  plugins: [
    // Initial configuration
    //initialConfigPlugin,
    new HtmlWebpackPlugin({
      hash: true,
      template: `./public/index.html`,
      filename: `index.dev.html`,
      chunks: `index`,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        postcss: function () {
          return [autoprefixer];
        },
      },
    }),
  ],
};
