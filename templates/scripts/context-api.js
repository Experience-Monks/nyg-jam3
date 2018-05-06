/**
 * Generating Context API from template
 *
 * @argument {string} [filename] (It is required)
 *
 * @example (node scripts/context-api.js [filename])
 */
const path = require('path');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');
const maxstache = require('maxstache');

/**
 * Global variables
 *
 * @const {string} CONTEXT_ROOT_DIR_NAME (name of context root directory)
 * @const {string} CONTEXT_ROOT_PATH (context root path)
 * @const {string} CONTEXT_TEMPLATE_PATH (context api template path)
 * @const {string} contextName (name of new context api file)
 */
const CONTEXT_ROOT_DIR_NAME = 'contexts';
const CONTEXT_ROOT_PATH = path.resolve(__dirname, [`../src/${CONTEXT_ROOT_DIR_NAME}`].join(''));
const CONTEXT_TEMPLATE_PATH = path.resolve(__dirname, 'templates/context/context.js');
const contextName = capitalizeFirstLetter(argv._[0]);

/**
 * Capitalize the first letter of string
 *
 * @param {string} string
 * @returns {string} (parsed string)
 */
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Check directory path. Create directory if not existed
 *
 * @param {string} directory (directory path)
 */
function checkDirectory(directory) {
  try {
    fs.statSync(directory);
    console.log(`[checkDirectory] path is existed : ${directory}`);
  } catch (error) {
    try {
      fs.mkdirSync(directory);
      console.log(`[checkDirectory] new directory has been created : ${directory}`);
    } catch (error) {
      console.error(chalk.red(`[Error] fail to create a directory : ${directory}`));
      console.error(chalk.red(error));
      process.exit(1);
    }
  }
}

/**
 * Generates Context API from template
 *
 * @param {string} input (template file path)
 * @param {string} output (destination of file path)
 */
function generateContext(input, output) {
  const data = { name: contextName };

  fs.readFile(input, 'utf8', (err, content) => {
    if (err) {
      console.error(chalk.red(`[Error] fail to read file : ${input}`));
      return;
    }

    content = maxstache(content, data);
    fs.writeFile(output, content, err => {
      if (err) {
        console.error(chalk.red(`[Error] fail to write file : ${output}`));
        return;
      }
      console.log(chalk.green(`Generating ${contextName}Context is done`));
    });
  });
}

/**
 * script start
 */
if (!contextName) {
  console.error(chalk.red(`Error: Must give a name to create.`));
  process.exit(0);
}

console.log(`context-api ------ ${contextName}`);
checkDirectory(CONTEXT_ROOT_PATH);
generateContext(CONTEXT_TEMPLATE_PATH, path.join(CONTEXT_ROOT_PATH, `${contextName}Context.js`));
