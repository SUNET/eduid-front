//  from https://github.com/lelandrichardson/enzyme-example-karma-webpack/raw/master/test/.setup.js
//  see  https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md

var Promise = require('es6-promise').Promise;  // Promise polyfill

var intl = require('intl');  // intl polyfill

var babel = require("babel-polyfill");  // babel polyfill

// https://github.com/airbnb/enzyme/pull/1513#issuecomment-384577007
var enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

var context = require.context('.', true, /-test\.js$/); //make sure you have your directory and regex test set correctly!
context.keys().forEach(context);

var context2 = require.context('../plugins', true, /test\.js$/);
context2.keys().forEach(context2);
