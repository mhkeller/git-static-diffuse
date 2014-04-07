
/**
 * Module dependencies.
 */

var fs = require("fs"),
		gitstatic = require('../');

var express = require("express"),
    optimist = require("optimist");

var argv = optimist.usage("Usage: $0")
    .options("h", {
      alias: "help",
      describe: "display this help text"
    })
    .options("repositories", {
      default: "repositories",
      describe: "path to directory of git repositories"
    })
    .options("port", {
      default: 3000,
      describe: "http port"
    })
    .check(function(argv) {
      if (argv.help) throw "";
      try { var stats = fs.statSync(argv.repositories); } catch (e) { throw "Error: " + e.message; }
      if (!stats.isDirectory()) throw "Error: invalid --repositories directory.";
    })
    .argv;

var reps = argv.repositories;
gitstatic.repositories(reps)

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', argv.port || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/:repo?', routes.repo);
app.get('/:repo/:branch?', routes.branch);
app.get('/:repo/:branchOrBranch/:file?', routes.fullFile(gitstatic));
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
