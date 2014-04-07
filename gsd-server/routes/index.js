
/*
 * GET home page.
 */

var fs = require('fs'),
 		gs = require('../..'),
 		jk = require('junk');

exports.index = function(req, res){
	fs.readdir(gs.repositories(), function(err, folders){
		folders = folders.filter(jk.not);
	  res.render('index', { page_title: 'Repositories', repos: folders });
	})
};

exports.repo = function(req, res){
	var repo = req.params.repo
	gs.getBranches(repo, function(err, branches){
	  res.render('repo', { page_title: repo, repo: repo, branches: branches });
	});
}

exports.branch = function(req, res){
	console.log('commitOrBranch')
	var repo = req.params.repo,
			branch = req.params.branch;
	gs.getBranchCommits(repo, function(err, commits){
	  res.render('branch', { page_title: repo + ' - ' + branch, repo: repo, branch: branch, commits: commits });
	})
	// console.log(req.params)
}

exports.fullFile = function(gs){
	// return function(req, res){
	// 	console.log('fullfile')
 //  res.render('index', { title: 'fullfile' });
	// }
	return gs.route();
}
