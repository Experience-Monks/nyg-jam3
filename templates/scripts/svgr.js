const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const mkdirp = require('mkdirp');
const svgr = require('svgr').default;

console.log(argv);
/**
 * NOTE : argument list
 *        -r [dir-name]     - root dirotory, SvgComponents by default
 *        --noSubDir        - no sub-directory, false by default
 *        --component-js    - generate [svg file name].js, index.js by default
 *                          - if noSubDir is true, noIndexJs will be true
 */
const rootDir = argv.r || 'SvgComponents';
const noSubDir = argv.noSubDir || false;
const noIndexJs = noSubDir || argv['component-js'] || false;
console.log(`-------------------SCRIPT CONFIG--------------------
rootDir   : ${rootDir}
noSubDir  : ${noSubDir}
noIndexJs : ${noIndexJs}
----------------------------------------------------`);

// svgr options
const SVGR_OPTS = {
  prettier: true,
  singleQuote: true,
  dimensions: false,
  precision: 3,
  ref: true
};

const COMPONENT_PATH = path.resolve(__dirname, [`../src/components/${rootDir}`].join(''));
const files = [];
const directories = [];

// check root directory
fs.stat(COMPONENT_PATH, (err, stat) => {
  if (err) {
    mkdirp(COMPONENT_PATH, err => {
      if (err) {
        console.log(`[Error] fail to create root directory.`);
        console.log(err);
      } else {
        console.log(`[Report] new root directory has been created.`);
        getAllFiles(COMPONENT_PATH);
        cleanUp();
        generateSvgComponents();
      }
    });
  } else {
    console.log(`[Report] root directory ${rootDir} is already existed.`);
    getAllFiles(COMPONENT_PATH);
    cleanUp();
    generateSvgComponents();
  }
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// get all files and sub directories in SvgComponents directory
function getAllFiles(dir) {
  fs.readdirSync(dir).forEach(file => {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      directories.push(name);
      getAllFiles(name);
    }

    if (fs.statSync(name).isFile()) {
      files.push(name);
    }
  });
}

// clean up SvgComponent directories if not svg
function cleanUp() {
  files
    .filter(file => path.extname(file) !== '.svg')
    .concat(directories)
    .forEach(file => {
      if (path.extname(file) === '') {
        fs.rmdir(file, err => {
          if (err) {
            console.log(`${err}`);
          }
          console.log(`[DELETE] directory ${file}`);
        });
      } else {
        fs.unlink(file, err => {
          if (err) {
            console.log(`${err}`);
          }
          console.log(`[DELETE] file ${file}`);
        });
      }
    });
}

// generate svg component by using svgr
function generateSvgComponents() {
  files.filter(file => path.extname(file) === '.svg').forEach(file => {
    fs.readFile(file, 'utf8', (err, content) => {
      var filename = file.replace(/^.*[\\/]/, '');
      const outputFilename = capitalizeFirstLetter(filename.split('.')[0]);

      // make directory
      const filePath = path.join(COMPONENT_PATH, noSubDir ? '' : outputFilename);
      mkdirp(filePath, err => {
        if (err) {
          console.log(`[error : mkdirp] ${err}`);
          return;
        }

        // convert svg to react component
        svgr(content, { ...SVGR_OPTS, componentName: outputFilename }).then(svgr_content => {
          const finalFile = path.join(filePath, noIndexJs ? outputFilename + '.js' : 'index.js');
          fs.writeFile(finalFile, svgr_content, err => {
            if (err) return;
            console.log(`[Svg Component] ${finalFile} Successful!`);
          });
        });
      });
    });
  });
}
