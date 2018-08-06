
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const initialConfigPlugin = require('./src/init-config').initialConfigPlugin;
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 9000
    },
    entry: {
      // To activate the web server, uncomment below 2 lines and
      // add a script to package.json pointing to "webpack-dev-server"
      // WebpackDevServer host and port:
      // server: 'webpack-dev-server/client?http://localhost:8080',
      signup: './src/entry-points/signup',
    },
    output: {
      path: path.join(__dirname, 'build'),
      publicPath: 'https://dashboard.eduid.local.emergya.info/static/front-build/',
      filename: '[name]-bundle.dev.js'
    },
    devtool: 'source-map',
    resolve: {
      // allow us to import components in tests like:
      // import Example from 'components/Example';
      modules: [
        path.resolve(__dirname, 'src'),
        'node_modules'
      ],
      // allow us to avoid including extension name
      extensions: ['.js', '.jsx', '.json'],
      mainFields: ["browser", "module", "main"]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loaders: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        },
        { 
          test: /\.png$/, 
          loader: "url-loader?limit=100000" 
        },
        { 
          test: /\.jpg$/, 
          loader: "file-loader" 
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
          loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
          loader: 'file-loader'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
          loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
        },
        { 
          test: /\.gif$/,
          loader: 'file-loader'
        }
      ]
    },
    plugins:[
      // Initial configuration
      initialConfigPlugin,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
        'Promise': 'exports-loader?global.Promise!es6-promise',
        'window.fetch': 'exports-loader?global.fetch!whatwg-fetch'
      }),
      new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
         // test: /\.xxx$/, // may apply this only for some modules
         options: {
           postcss: function () {
             return [autoprefixer, precss];
           }
         }
       }),
       // new BundleAnalyzerPlugin()
    ]
};
