/**
 * Converting raw svgs into React component
 *
 * List of the script argument
 * @argument -r (Root dirotory, SvgComponents by default)
 * @argument --noSubDir (No sub-directory, false by default)
 * @argument --index-js (Generate [svg file name].js by default.
 *                      If noSubDir is true, noIndexJs will be true)
 *
 * @example (node svg-component.js -r SvgComponents --noSubDir --index-js)
 * @example (npm run svg-component [filename].svg [filename.svg])
 */
const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const svgr = require('svgr').default;
const chalk = require('chalk');

/**
 * Svgr library options
 *
 * @property prettier (Use Prettier to format JavaScript code output)
 * @property singleQuote (Use single quotes instead of double quotes)
 * @property dimensions (Remove width and height from root SVG tag)
 * @property presicion (Set number of digits in the fractional part)
 * @property ref (To hook into the ref of the svg components)
 *
 * @see more details at https://github.com/smooth-code/svgr
 */
const SVGR_OPTS = {
  prettier: true,
  singleQuote: true,
  dimensions: false,
  precision: 3,
  ref: false
};

/**
 * Global variables
 *
 * @const {boolean} noSubDir (wheather using sub directory structure or not)
 * @const {boolean} useIndexJs (determin type of file name for Svg components)
 * @const {string} parentDir (the most parent directory)
 * @const {string} COMPONENT_PATH (Svg component directory path)
 * @const {array} files (An array of file path)
 * @const {array} directories (An array of directory path)
 */
const noSubDir = argv.noSubDir || false;
const useIndexJs = noSubDir || argv['index-js'] || false;
const parentDir = argv.r || 'SvgComponents';
const COMPONENT_PATH = path.resolve(__dirname, [`../src/components/${parentDir}`].join(''));
const files = [];
const directories = [];

/**
 * Custom asyncForEach function
 *
 * @param {array} array
 * @param {function} callback
 */
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

/**
 * Promise wait
 *
 * @param {number} ms (millisecond)
 */
const waitFor = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Capitalize the first letter of string
 *
 * @param {string} string
 * @returns {string} (parsed string)
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Convert string into camel case string
 *
 * @param {string} string
 * @returns {string} (camelcase string)
 */
function toCamelCase(string) {
  return string.replace(/[^A-Za-z0-9]/g, ' ').replace(/^\w|[A-Z]|\b\w|\s+/g, function(match, index) {
    if (+match === 0 || match === '-' || match === '.') {
      return ''; // or if (/\s+/.test(match)) for white spaces
    }
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

/**
 * Check directory path. Create directory if not existed
 *
 * @param {string} directory (directory path)
 */
function checkDirectory(directory) {
  try {
    fs.statSync(directory);
    console.log(`${chalk.green('[info]')} path is existed : ${directory}`);
  } catch (error) {
    try {
      fs.mkdirSync(directory);
      console.log(`${chalk.green('[info]')} new directory has been created : ${directory}`);
    } catch (error) {
      console.error(chalk.red(`[Error] fail to create a directory : ${directory}`));
      console.error(chalk.red(error));
      process.exit(0);
    }
  }
}

/**
 * Recursively collect all file and sub directory path in SvgComponents directory
 *
 * @param {string} dir (directory path)
 * @returns {array} (an array of files and directories)
 */
function getAllFiles(directory) {
  fs.readdirSync(directory).forEach(file => {
    const name = path.join(directory, file);

    if (fs.statSync(name).isDirectory()) {
      directories.push(name);
      getAllFiles(name);
    } else if (fs.statSync(name).isFile()) {
      files.push(name);
    }
  });

  // filter files if svg and sort array files first and then adding directories
  return files.filter(file => path.extname(file) !== '.svg').concat(directories);
}

/**
 * Clean up files
 *
 * @param {array} files (an array of files and directories)
 */
async function cleanFiles(allFiles) {
  await asyncForEach(allFiles, async file => {
    await waitFor();
    if (fs.statSync(file).isDirectory()) {
      try {
        fs.rmdirSync(file);
        console.log(`${chalk.green('[info]')} directory ${file} is deleted`);
      } catch (error) {
        console.error(chalk.red(`[Error] fail to delete a directory : ${file}`));
        console.error(`${error}`);
      }
    } else if (fs.statSync(file).isFile()) {
      try {
        fs.unlinkSync(file);
        console.log(`${chalk.green('[info]')} file ${file} is deleted`);
      } catch (error) {
        console.error(chalk.red(`[Error] fail to delete a file : ${file}`));
        console.error(`${error}`);
      }
    }
  });
}

/**
 * Generate svg component
 *
 * @param {array} svgs (an array of svgs in the component directory)
 */
function generateSvgComponents(svgs) {
  svgs.forEach(file => {
    fs.readFile(file, 'utf8', (err, content) => {
      var filename = file.replace(/^.*[\\/]/, '');
      const outputFilename = capitalizeFirstLetter(toCamelCase(filename.split('.')[0]));
      const filePath = path.join(COMPONENT_PATH, noSubDir ? '' : outputFilename);

      try {
        // make directory
        fs.mkdirSync(filePath);

        // convert svg to React component
        svgr(content, { ...SVGR_OPTS, componentName: outputFilename }).then(svgr_content => {
          const finalFile = path.join(filePath, useIndexJs ? 'index.js' : outputFilename + '.js');
          fs.writeFile(finalFile, svgr_content, err => {
            if (err) return;
            console.log(chalk.green(`[Svg Component] ${finalFile} Successful!`));
          });
        });
      } catch (error) {
        console.error(chalk.red(`[Error] fail to create a directory ${file}`));
        console.error(chalk.red(error));
      }
    });
  });
}

/**
 * Start script
 */
console.log(`-------------------SCRIPT CONFIG--------------------
parentDir   : ${parentDir}
noSubDir    : ${noSubDir}
useIndexJs  : ${useIndexJs}
----------------------------------------------------\n`);

async function main() {
  checkDirectory(COMPONENT_PATH);
  let allFiles = [];
  let svgs = [];

  if (argv._.length === 0) {
    console.log(`${chalk.green('[info]')} Transforming a whole SVG(s) in : ${COMPONENT_PATH}`);
    allFiles = getAllFiles(COMPONENT_PATH);
    svgs = files.filter(file => path.extname(file) === '.svg');
  } else if (argv._.length > 0) {
    console.log(`${chalk.green('[info]')} Transforming selected SVG(s) : ${argv._}`);
    await asyncForEach(argv._, async svgfile => {
      try {
        fs.statSync(path.join(COMPONENT_PATH, svgfile));
        const outputFilename = capitalizeFirstLetter(toCamelCase(svgfile.split('.')[0]));
        const dirPath = path.join(COMPONENT_PATH, noSubDir ? '' : outputFilename);
        const filePath = path.join(COMPONENT_PATH, noSubDir ? '' : outputFilename, `${outputFilename}.js`);

        try {
          if (fs.statSync(dirPath).isDirectory()) {
            directories.push(dirPath);
          }

          if (fs.statSync(filePath).isFile()) {
            files.push(filePath);
          }
        } catch (error) {
          console.log(`${chalk.green('[info]')} Path is clean`);
        }

        svgs.push(path.join(COMPONENT_PATH, svgfile));
        await waitFor();
      } catch (error) {
        console.error(chalk.red(`[ERROR] svg file, ${svgfile}, is not existed.`));
        process.exit(0);
      }
    });

    allFiles = [...files.filter(file => path.extname(file) !== '.svg'), ...directories];
  }

  cleanFiles(allFiles).then(() => {
    if (svgs.length > 0) generateSvgComponents(svgs);
  });
}

main();
