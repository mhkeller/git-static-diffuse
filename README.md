Git Static Diffuse
====

Turn a directory of Git repositories into a static file server as well as browse and view repositories, branches and commits in the browser. 

This fork differs from the original [git-static](https://github.com/mbostock/git-static) in it serves multiple Git repos from one directory by specifying the name of the repo as the first part of your URL. The original serves only one repo, unless I completely misunderstood what it's doing... which is possible.

This fork also includes a web server to browse the tree.

## Installation

Install globally so you can access it from the command line

````bash
npm install git-static-diffuse -g
````

## Starting the server

`cd` into the folder that holds your git repositories and start the server with `moire`.

```bash
moire start
```

Go to <http://localhost:3000/repository/HEAD/path/to/file.html> to view a file from the source repository. You can replace `HEAD` with a specific commit version, short names and aliases for commits such as `0ad4156` or `HEAD~1`, or even branch names.

You can also navigate to any part of that path to view the tree.

View all repos

````
http://localhost:3000
````

View all branches

````
http://localhost:3000/repository-name
````

View all commits

````
http://localhost:3000/repository-name/branch-name
````

Clicking on a commit will assume that you have an `index.html` file and take you to that.

## Developing

If you want to keep the server alive while you're editing it, use [nodemon](https://github.com/remy/nodemon) and include the jade files

````
nodemon path/to/bin/index.js start -e js,jade,css
````

Also watch the [stylus](http://learnboost.github.io/stylus/) files

````
stylus -w path/to/gsd-server/public/stylesheets/
````
