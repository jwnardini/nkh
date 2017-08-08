# Chief Toolkit

> A full featured toolkit for compiling js, sass and styleguide

#### Features
- Gulp
- Webpack
- [Fabricator](https://github.com/fbrctr/fabricator)
- Image minification
- Browser Sync

#### [Toolkit Demo](http://toolkit.clientapp.com)

## Global Requirements
- Node
- npm
- gulp

## Quick Start

To create standalone directory named toolkit inside your current folder
```shell
git clone https://github.com/rayestrada/toolkit.git yourtoolkit
cd yourtoolkit
npm install
```

To add toolkit files to current folder (theme install)
```shell
git init
git remote add origin https://github.com/rayestrada/toolkit.git
git pull origin master
npm install
rm -rf .git
rm .gitignore
```


## Compiling

**Development**: Starts a watch of the toolkit files and initializes Browser Sync 
```shell
npm start
```

**Production**: Compiles and minifies files for packaging
```shell
gulp
```


## Javascript

**Some Notes on...**
- how webpack is being used
- how to add new plugins/modules
- where to locate/write scripts
- how jquery can be used or included
- promote no script fallback best practices


## Styleguide

**Some Notes on...**
- Organization/location of files
- how to add a new material or page
- uses [handlebars](http://handlebarsjs.com/expressions.html) syntax
- Read full [documentation of Fabricator](https://github.com/fbrctr/fabricator-assemble)  


## Sass

**Some Notes on...**
- Organization using the atomic css modal
- Breakpoints
- promote accesibility best practices


## Node

#### Install a new node module
Saves the files into the node_modules folder and adds them to the package.json file as a dev dependency
```shell
npm install module_name --save-dev
```
or from github
```shell
npm install git://github.com/USERNAME/PROJECT.git --save-dev
```

#### Uninstall a node module
Removes the files from the node_modules folder and also removes the dev dependency from the package.json file
```shell
npm uninstall module_name --save-dev
```

#### Shrinkwrap
Use this [shrinkwrap](https://docs.npmjs.com/cli/shrinkwrap)
```shell
npm shrinkwrap --dev
```
