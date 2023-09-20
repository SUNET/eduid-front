const webpack = require("webpack");
const path = require("path");
const autoprefixer = require("autoprefixer");
//const initialConfigPlugin = require("./src/init-config").initialConfigPlugin;
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const transform = require("@formatjs/ts-transformer").transform;

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
    index: "./src/entry-points/index",
    errors: "./src/entry-points/errors",
    faq: "./src/entry-points/faq",
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
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              getCustomTransformers() {
                return { before: [transform({ overrideIdFn: "[sha512:contenthash:base64:6]" })] };
              },
            },
          },
        ],

        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
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
    ...["faq", "errors", "index", "dashboard", "signup"].map((entryName) => {
      return new HtmlWebpackPlugin({
        hash: true,
        template: `./public/${entryName}.html`,
        filename: `${entryName}.dev.html`,
        chunks: [`${entryName}`],
      });
    }),
    // Initial configuration
    //initialConfigPlugin,
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
