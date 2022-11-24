var context = require.context(".", true, /-test\.js$/); //make sure you have your directory and regex test set correctly!
context.keys().forEach(context);

var context2 = require.context("../plugins", true, /test\.js$/);
context2.keys().forEach(context2);
