# A0M33KAJ-uml-editor

## Installation
To prepare the project to build run following commands:
* npm install --save-dev babel-preset-es2015

## Compilation, project structure
The JavaScript source files are written in ES6 syntax, and are transpiled via 
[babel](https://babeljs.io/) into generally compatible code. The project is bundled together
with [webpack](https://webpack.github.io/), which can be triggered in the root directory 
with the ```npm run webpack``` command. For styling, [less](http://lesscss.org/) is used 
in this project.

The files are ordered in a standard way into following structure:
* ```/dist``` - static content and compiled JS files
    * ```/css``` - LESS source files are located in the ```/less``` subfolder and are compiled 
    into the ```/build``` subfolder as .css files
    * ```/js``` - transpiled JavaScript files by babel
    * ```index.html``` - the page with the application
* ```/src``` - JavaScript source files in the ES6 syntax

## Usage
You have in your hand UML sequential diagram editor which can manipulate lifelines, its 
bars and actions between each other. 

Creating elements:
* use button "Add new LifeLine" to crate a life line
* use "plus" button at the end of life line to create a new bar
* click on source bar and then on target bar to create action between these two

For manipulating with objects is used a context menu or in some cases drag and drop approach.