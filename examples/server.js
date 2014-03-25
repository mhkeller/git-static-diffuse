var fs = require("fs");

var express = require("express"),
    optimist = require("optimist"),
    gitstatic = require("../");

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

var server = express();

server.get(/^\/.*/, gitstatic.route().repositories(argv.repositories) );

server.listen(argv.port);
