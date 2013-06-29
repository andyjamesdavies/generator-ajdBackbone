'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var AjdbackboneGenerator = module.exports = function AjdbackboneGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AjdbackboneGenerator, yeoman.generators.Base);

AjdbackboneGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'projectName',
    message: 'What do you want to call this project?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;

    cb();
  }.bind(this));
};

AjdbackboneGenerator.prototype.app = function app() {
    this.mkdir('test');
    this.mkdir('public');
    this.mkdir('public/js');
    this.mkdir('public/css');
    this.mkdir('public/tps');

    this.copy('index.html', 'public/index.html');
    this.copy('_index.md', 'index.md');
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
};

AjdbackboneGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

AjdbackboneGenerator.prototype.runtime = function runtime() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('gitignore', '.gitignore');
};
