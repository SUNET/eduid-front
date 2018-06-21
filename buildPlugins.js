
var filesystem = require("fs");
var webpack = require('webpack');
var exec = require('child_process').exec;

/*
 * each plugin has a python dir and a js dir. they are placed in 2 sites:
 * within a plugins/ directory in eduid-front, and in the python path of the
 * actions app.
 *
 * in eduid-front there is a script, executed from package.json, that inspects
 * the plugins directory, and executes webpack on them. 
 *
 * The python part of the plugin, rather than providing a template to be
 * rendered by the actions app, provides the route to the plugin's js bundle,
 * with is sourced from the index.html rendered by the actions app.
 *
 */

filesystem.readdirSync('plugins').forEach(function(plugin) {
    var comm = "webpack --config plugins/" + plugin + "/webpack.config.js --mode development";
    exec(comm,
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                 console.log('exec error: ' + error);
            }
        });
});
