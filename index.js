const nyg = require('nyg');
const exec = require('child_process').exec;
const fs = require('fs');

// Generator configuration
const globs = [
  { base: 'templates/', glob: '.storybook/**/*' },
  { base: 'templates/', glob: 'docs/**/*' },
  { base: 'templates/', glob: 'public/**/*' },
  { base: 'templates/', glob: 'scripts/**/*' },
  { base: 'templates/', glob: 'src/**/*' },
  { base: 'templates/', glob: 'test/**/*' },
  { base: 'templates/', glob: '*' }
];

const generator = nyg(null, globs)
  .on('postinstall', onPostInstall)
  .run();

/**
 * Post Install event
 */
function onPostInstall() {
  var done = generator.async();
  Promise.all([updateNvmVersion(), updateGeneratedPackageJson()])
    .then(() => {
      console.log('App generated');
      done();
    })
    .catch(e => {
      console.log(e);
    });
}

/**
 * Update NVM lock version with the current user sections
 *
 */
function updateNvmVersion() {
  return new Promise((resolve, reject) => {
    exec(`node -v > ${generator.cwd}/.nvmrc`, function(err) {
      if (err) return reject();
      resolve();
    });
  });
}

/**
 * Update generated package.json
 *
 */
function updateGeneratedPackageJson() {
  const packagePath = `${generator.cwd}/package.json`;
  const generatedPackageJson = JSON.parse(fs.readFileSync(packagePath));

  return _updateLintStaged(packagePath, generatedPackageJson);
}

/**
 * Remove the property gitDir from LintStaged
 * This property allows lint-staged to run inside a not subfolder, once generated is wrong
 *
 * @param {any} packagePath - Package JSON path
 * @param {any} packageJson - Package JSON already parsed
 * @returns {void}
 */
function _updateLintStaged(packagePath, packageJson) {
  delete packageJson['lint-staged'].gitDir;

  return new Promise((resolve, reject) => {
    fs.writeFile(packagePath, JSON.stringify(packageJson, null, 2), function(err) {
      if (err) return reject();
      resolve();
    });
  });
}
