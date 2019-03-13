const fs = require('fs');
const exec = require('child_process').exec;
const nyg = require('nyg');

// Generator configuration
const globs = [
  { base: 'templates/', glob: '.storybook/**/*', template: false },
  { base: 'templates/', glob: 'docs/**/*', template: false },
  { base: 'templates/', glob: 'public/**/*', template: false },
  { base: 'templates/', glob: 'scripts/**/*', template: false },
  { base: 'templates/', glob: 'src/**/*', template: false },
  { base: 'templates/', glob: 'test/**/*', template: false },
  { base: 'templates/', glob: '*', template: false }
];

const generator = nyg(null, globs)
  .on('postinstall', onPostInstall)
  .run();

/**
 * Post Install event
 */
function onPostInstall() {
  var done = generator.async();
  Promise.all([updateNvmVersion(), updateGeneratedPackageJson(), renameGitIgnore()])
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
      if (err) return reject(new Error());
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

  return _updateNodeJSRequiredVersion(packagePath, generatedPackageJson);
}

/**
 * Rename gitignore to .gitignore
 *
 */
function renameGitIgnore() {
  const gitIgnorePath = `${generator.cwd}/gitignore`;
  const generatedGitIgnore = `${generator.cwd}/.gitignore`;

  return new Promise((resolve, reject) => {
    fs.rename(gitIgnorePath, generatedGitIgnore, function(err) {
      if (err) return reject(new Error());
      resolve();
    });
  });
}

/**
 * Update node version in engines property inside the package.json
 *
 * @param {any} packagePath - Package JSON path
 * @param {any} packageJson - Package JSON already parsed
 * @returns {Promise}
 */
function _updateNodeJSRequiredVersion(packagePath, packageJson) {
  const nodeVersion = process.version.replace('v', '');
  packageJson['engines'].node = `>=${nodeVersion}`;

  return new Promise((resolve, reject) => {
    fs.writeFile(packagePath, JSON.stringify(packageJson, null, 2), function(err) {
      if (err) return reject(new Error());
      resolve();
    });
  });
}
