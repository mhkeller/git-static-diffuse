#!/usr/bin/env node
var express = require("express"),
    optimist = require("optimist");

var argv = optimist.usage("Usage: $0")
    .options("h", {
      alias: "help",
      describe: "display this help text"
    })
    .options("repositories", {
      describe: "path to directory of git repositories"
    })
    .options("port", {
      default: 3000,
      describe: "http port"
    })
    .check(function(argv) {
      if (argv['help'] || argv['_'] != "start") throw "";
    })
    .argv;

var gsd_server = require('../gsd-server/app.js');

gsd_server.start(argv['repositories'], argv['port']);