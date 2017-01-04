var fs = require('fs-extra');
var async = require('async');
var sh = require("shelljs");
var cwd = sh.pwd().stdout;
var chalk = require('chalk');
var nameOfComponent = process.argv[2];
var componentDirectory = process.argv[3] !== '/' ? cwd + '/app/components/' + process.argv[3] : cwd + '/app/components/';
var componentHasState = !(process.argv[4] && process.argv[4] === 'no-state');
var disableLogs = false;
var isContainer = process.argv[5];
componentDirectory = isContainer && isContainer === 'true' ? cwd + '/app/containers/' + process.argv[3] : componentDirectory;

/**
 * Print error messages
 * @param {string} Error message to display
 */
var error = function(message) {
  if (!disableLogs) {
    console.log(chalk.red('---------------------------------------'));
    console.log(chalk.red('ERROR - createComponent'));
    console.log(chalk.red('--------------------------------------- \n'));
    console.log(chalk.red(message + '\n'));
    console.log(chalk.red('---------------------------------------'));
    console.log(chalk.red('--------------------------------------- \n'));
  }
  process.exit(1);
};

/**
 * Print progress messages
 * @param {number} The step (1, 2, 3)
 * @param {string} The message that describes the step
 * @param {boolean} Wheter or not to show the heading
 * @param {boolean} Whether or not to show the closing lines
 */
var progress = function(step, message, showHeading, end) {
  if (!disableLogs) {
    if (showHeading) {
      console.log(chalk.yellow('---------------------------------------'));
      console.log(chalk.yellow('STEP - ' + step));
      console.log(chalk.yellow('--------------------------------------- \n'));
    }
    if (message) {
      console.log(chalk.blue(message + '\n'));
    }
    if (end) {
      console.log(chalk.yellow('---------------------------------------'));
      console.log(chalk.yellow('--------------------------------------- \n'));
    }
  }
};

/**
 * Once directory and files have been created
 * @param {string} The name of the component that needs to be created
 * @param {string} The directory that the compnent needs to be created in
 */
var done = function(componentName, componentDirectory) {
  if (!disableLogs) {
    console.log(chalk.yellow('---------------------------------------'));
    console.log(chalk.yellow('SUCCESS - ALL DONE'));
    console.log(chalk.yellow('--------------------------------------- \n'));
    console.log(chalk.blue(componentName + ' has been created successfully in: \r\n'));
    console.log(chalk.blue(componentDirectory + '\n'));
    console.log(chalk.yellow('---------------------------------------'));
    console.log(chalk.yellow('--------------------------------------- \n'));
  }
};

/**
 * Validate the arguments passed through the npm run command
 * @param {string} The name of the component that needs to be created
 * @param {string} The directory that the compnent needs to be created in
 */
 var validateArgs = function(componentName, componentDirectory) {
  progress(1, 'Validating arguments', true, false);

  if (!componentName) {
    return error('Please enter a name for your component');
  } else {
    progress(1, 'Component name is valid - ' + componentName + ' ✓', false, false);
  }

  if (!componentDirectory) {
    progress(1, 'WARNING - No component directory passed. Defaulting to /app/components', false, false);
  } else {
    try {
      var newDirecotry = fs.lstatSync(componentDirectory + '/' + componentName);
      if (newDirecotry.isDirectory()) {
        error('Component (' + componentName + ') already exits in: \r\n' + componentDirectory);
      }
    } catch(e) {
      progress(1, 'Going to create component in: \r\n' + componentDirectory + ' ✓', false, false);
    }
  }
  progress(null, null, false, true);
};

/**
 * Create the copy directory and copy over the files from 'app/components/templates'
 * @param {string} The name of the component that needs to be created
 * @param {string} The directory that the compnent needs to be created in
 * @param {boolean} If true will copy over with-state.js else it will copy over without-state.js
 */
var copyTemplatesToDirectory = function(componentName, componentDirectory, componentHasState) {
  var newComponentDirectory = componentDirectory + '/' + componentName;
  var componentTemplateSrc = componentHasState ? cwd + '/app/components/templates/with-state.js' : cwd + '/app/components/templates/without-state.js';
  var stylesTemplateSrc = cwd + '/app/components/templates/styles.js';
  var componentTemplateDest = newComponentDirectory + '/index.js';
  var stylesTemplateDest = newComponentDirectory + '/styles.js';
  var stateLogMessage = componentHasState ? '(WITH STATE)' : '(WITHOUT STATE)';

  progress(2, 'Creating new React Component ' + stateLogMessage, true, false);

  async.waterfall([
    function(next) {
      fs.mkdirs(newComponentDirectory, next);
    },
    function(directory, next) {
      progress(2, 'Created new directory (' + componentName + ') in: \r\n' + componentDirectory + ' ✓', false, false);
      fs.copy(componentTemplateSrc, componentTemplateDest, next);
    },
    function(next) {
      progress(2, 'Created new component file in directory (index.js)' + ' ✓', false, false);
      fs.copy(stylesTemplateSrc, stylesTemplateDest, next);
    },
    function(next) {
      progress(2, 'Created new style file in directory (styles.js)' + ' ✓', false, false);
      next(null);
    }
  ], function(err) {
    if (err) {
      error(err);
    } else {
      progress(null, null, false, true);
      done(componentName, componentDirectory);
    }
  });
};

/**
 * Init function that kicks off the process to create a component in a given directory
 * @param {string} The name of the component that needs to be created
 * @param {string} The directory that the component needs to be created in
 * @param {boolean} If the component that is being created has state or not
 */
var crc = function(componentName, componentDirectory, componentHasState) {
  validateArgs(componentName, componentDirectory);
  copyTemplatesToDirectory(componentName, componentDirectory, componentHasState);
};

crc(nameOfComponent, componentDirectory, componentHasState);

