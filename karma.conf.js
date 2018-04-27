
var argv = require('yargs').argv;
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var initialConfigPlugin = require('./src/init-config').initialConfigPlugin;
const path = require('path');

process.env.CHROME_BIN = "chromium"

var webpackKarma = {
  resolve: webpackConfig.resolve,
  module: webpackConfig.module,
  plugins: [ initialConfigPlugin ]
};

webpackKarma.devtool = 'inline-source-map';
// required for enzyme to work properly
webpackKarma.resolve.alias = { 'sinon': 'sinon/pkg/sinon' };
webpackKarma.externals = {
  'cheerio': 'window',
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true
};

webpackKarma.module.rules = [
  {
    test: /\.js$/,
    use: {
        loader: 'istanbul-instrumenter-loader',
        options: {
          //esModules: true,
          //produceSourceMap: true
        }
    },
    enforce: 'post',
    include: path.resolve('src/')
  },
  {
    test: /\.js$/,
    use: {loader: 'babel-loader'},
    enforce: 'pre',
    exclude: /node_modules/,
  },
  {
    test: /\.json$/,
    use: {loader: 'json-loader'},
    enforce: 'pre',
    exclude: /node_modules/,
  },
  {
    test: /\.scss$/,
    use: [
      {loader: 'style-loader'},
      {loader: 'css-loader'},
      {loader: 'postcss-loader'},
      {loader: 'sass-loader'}
    ],
    enforce: 'pre',
    exclude: /node_modules/,
  },
  {
    test: /\.css$/,
    use: [
      {loader: 'style-loader'},
      {loader: 'css-loader'}
    ],
    enforce: 'pre'
  },
  {
    test: /\.png$/,
    use: {loader: 'url-loader?limit=100000'},
    enforce: 'pre'
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    use: {loader: "url-loader?limit=10000&mimetype=application/octet-stream"},
    enforce: 'pre'
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: {loader: "url-loader?limit=10000&mimetype=image/svg+xml"},
    enforce: 'pre'
  },
  {
    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
    use: {loader: "url-loader?limit=10000&mimetype=application/font-woff"},
    enforce: 'pre'
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    use: {loader: "file-loader"},
    enforce: 'pre'
  }
];

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ], //run in Browsers
    // Run each test in 3 browsers:
    // browsers: [ 'PhantomJS', 'Chrome', 'Firefox' ], //run in Browsers

    customLaunchers: {
      'PhantomJS_debug': {
        base: 'PhantomJS',
        options: {
          windowName: 'debug',
          settings: {
            webSecurityEnabled: false
          },
        },
        flags: ['--load-images=true'],
        debug: true
      }
    },

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },

    // just run once by default unless --watch flag is passed
    //singleRun: !argv.watch,
    singleRun: true,
    autoWatch: false,

    // which karma frameworks do we want integrated
    frameworks: [ 'mocha' ], //use the mocha test framework
    // files with tests
    files: [
      'src/test.webpack.js'
    ],
    preprocessors: {
      // these files we want to be precompiled with webpack
      // also run tests through sourcemap for easier debugging
      'src/test.webpack.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'progress', 'coverage-istanbul' ], //report results in this format
    coverageIstanbulReporter: {
        reports: [ 'html', 'text-summary' ],
        fixWebpackSourcePaths: true,
        dir: path.join(__dirname, 'coverage'),
        'report-config': {
            html: {subdir: 'html'}
        }
    },
    webpack: webpackKarma,
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },
    plugins: [
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-coverage',
      'karma-mocha',
      'karma-coverage-istanbul-reporter'
    ],
  });
};
