Git Static Diffuse
====

Turn a directory of Git repositories into a static file server and browse repositories, branches and commits in the browser. 

This fork differs from the original [git-static](https://github.com/mbostock/git-static) in it serves multiple Git repos from one directory by specifying the name of the repo as the first part of your URL. The original serves only one repo, unless I completely misunderstood what it's doing... which is possible.

This fork also includes a web server to browse the tree.

## Installation

After running `npm install`, make a `repositories` directory to hold your projects:

```bash
mkdir repositories
```

Each project will be an empty git repository inside this folder. For example:

````
cd repositories
mkdir repository
git init --bare
````

Then, push from your source Git repository the files you want to serve:

```bash
cd ~/Development/other
git remote add static ~/Development/git-static-diffuse/repositories/repository
git push static master
```


## Starting the server

Now you can launch the server!

```bash
node ~/Development/git-static-diffuse/gsd-server/app.js --repositories ~/Development/git-static-diffuse/repositories
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
nodemon gsd-server/app.js --repositories repositories -e js,jade,css
````

Also watch the [stylus](http://learnboost.github.io/stylus/) files

````
stylus -w gsd-server/public/stylesheets/
````
