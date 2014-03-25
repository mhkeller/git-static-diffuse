# Git Static

Serve static files backed by Git. This fork differs from the original [git-static](https://github.com/mbostock/git-static) in that this version allows you to serve multiple git repos from one directory by specifying the name of the repo as the first part of your URL. The original git-static services one repo, unless I completely misunderstood what it's doing... which is possible.

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
git remote add static ~/Development/git-static/repositories/repository
git push static master
```

Now you can launch the server!

```bash
node ~/Development/git-static/examples/server --repositories ~/Development/git-static/repositories
```

Go to <http://localhost:3000/repository/HEAD/path/to/file.html> to view a file from the source repository. You can replace `HEAD` with a specific commit version, short names and aliases for commits such as "0ad4156" or "HEAD~1", or even branch names.
