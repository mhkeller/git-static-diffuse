
/**
 * Module dependencies.
 */

var fs = require("fs"),
		gs = require('../'),
    jk = require('junk');

var express = require('express');
var http = require('http');
var path = require('path');
var port;


var app = express();

function startServer(reps, port_number){
  reps = reps || path.resolve('./');
  console.log(reps)
  gs.repositories(reps)
  // all environments
  app.set('port', port_number);
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

  app.get('/', function(req, res){
    fs.readdir(gs.repositories(), function(err, folders){
      folders = folders.filter(jk.not);
      res.render('index', { page_title: 'Repositories', repos: folders });
    });
  });

  app.get('/:repo?', function(req, res){
    var repo = req.params.repo
    gs.getBranches(repo, function(err, branches){
      res.render('repo', { page_title: repo, repo: repo, branches: branches });
    });
  });

  app.get('/:repo/:branch?', function(req, res){
    var repo = req.params.repo,
        branch = req.params.branch;
    gs.getBranchCommits(repo, function(err, commits){
      res.render('branch', { page_title: repo + ' - ' + branch, repo: repo, branch: branch, commits: commits });
    });
  });

  app.get('/:repo/:branchOrBranch/:file?*', gs.route());

  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
  
}

exports.start = startServer
