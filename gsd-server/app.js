
/**
 * Module dependencies.
 */

var fs = require("fs"),
		gs = require('../');

var express = require('express');
var http = require('http');
var path = require('path');
var port;


var app = express();

function startServer(reps, port_number){
  reps = reps || path.resolve('./');
  gs.repositories(reps);
  
  // all environments
  app.set('port', port_number);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(function (req, res, next) {
      if ('/robots.txt' == req.url) {
          res.type('text/plain')
          res.send("User-agent: *\nDisallow: /");
      } else {
          next();
      }
  });
  
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(require('stylus').middleware(path.join(__dirname, 'public')));
  app.use(app.router);

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }

  app.get('/', function(req, res){
    fs.readdir(gs.repositories(), function(err, files){
      var folders = files.map(function(file) {
        return path.join(gs.repositories(), file);
      }).filter(function(file){
        return fs.statSync(file).isDirectory();
      }).map(function(folder){
        // Clean up the name
        return folder.replace(gs.repositories() + '/', '');
      });
      console.log(folders)
      res.render('index', { page_title: 'Repositories', repos: folders });
    });
  });

  app.get('/frame/:repo/:branch/:commit/:file?*', function(req, res){
    var repo = req.params.repo,
        branch = req.params.branch;
        commit = req.params.commit;
        file =  req.params.file;

        if(commit === "index.html"){
          path = branch+ '/' + 'index.html';
        }else
        {
          path = commit + '/' + file;
        }
        console.log(path);

    gs.getBranchCommits(repo, branch, function(err, commits){
      res.render('frame', { page_title: repo + ' - ' + branch, repo: repo, branch: branch, path: path });
    });
  });


  app.get('/:repo?', function(req, res){
    var repo = req.params.repo
    console.log('here')
    gs.getBranches(repo, function(err, branches){
      res.render('repo', { page_title: repo, repo: repo, branches: branches });
    });
  });

  app.get('/:repo/:branch?', function(req, res){
    var repo = req.params.repo,
        branch = req.params.branch;
    gs.getBranchCommits(repo, branch, function(err, commits){
      res.render('branch', { page_title: repo + ' - ' + branch, repo: repo, branch: branch, commits: commits });
    });
  });


  app.get('/:repo/:branchOrBranch/:file?*', gs.route());

  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
  
}

exports.start = startServer
