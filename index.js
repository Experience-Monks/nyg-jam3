const nyg = require('nyg');
const exec = require('child_process').exec;
const fs = require('fs');
const emoji = require('node-emoji');

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

let msgCounter = 1;
const WELCOME_MSG = `
****************************************************
**                                                **
**             React Frontend Generator           **
**        https://github.com/Jam3/nyg-jam3        **
**                                                **
****************************************************
`;
const FINAL_MSG = `
${emoji.get(`clap`)} CONGRATS!!, You are ready to go

********************************************************************************
**                                                                            **
**  For more information about the generated scaffolding, review the docs:    **
**                                                                            **
**  What is included?: /docs/WHAT_IS_INCLUDED.md                              **
**  Developer guide?: /docs/DEVELOPER_GUIDE.md                                **
**                                                                            **
********************************************************************************
`;

console.log(WELCOME_MSG);

const generator = nyg(null, globs)
  .on('precopy', onPreCopyInstall)
  .on('preinstall', onPreInstall)
  .on('postinstall', onPostInstall)
  .run();

/**
 * Pre Copy event
 */
function onPreCopyInstall() {
  printGenericMessage('clipboard', 'Copying template files...');
  createGitRepository();
}

/**
 * Pre Install event
 */
function onPreInstall() {
  var done = generator.async();

  printGenericMessage('construction', 'Installing dependencies...');
  done();
}

/**
 * Post Install event
 */
function onPostInstall() {
  var done = generator.async();
  Promise.all([updateNvmVersion(), updateGeneratedPackageJson(), renameGitIgnore()])
    .then(() => {
      console.log(FINAL_MSG);
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
      if (err) return reject();
      resolve();
    });
  });
}

/**
 * Create an empty git repository
 *
 */
function createGitRepository() {
  printGenericMessage('package', 'Creating Git repository...');
  generator.spawn('git', ['init'], generator.cwd);
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
      if (err) return reject();
      resolve();
    });
  });
}

/**
 * Print a generic meessage in the console
 *
 * @param {*} emoji
 * @param {*} messaqe
 */
function printGenericMessage(emojiName = '', messaqe) {
  console.log(`[${msgCounter}]: ${emoji.get(emojiName)} ${messaqe}`);
  msgCounter++;
}
