/*
* Dependency report
* Format: [package-name] - [package version] - [license] - [source link]
* Example: bezier-easing - 2.0.3 - MIT - https://github.com/gre/bezier-easing
*/

const exec = require('child_process').exec;
const chalk = require('chalk');
const greenLicenses = require('./opensource-greenlicenses.json').greenLicenses;

exec('npm ls --depth 0 --prod --json', function(lsErr, lsStdout, lsStderr) {
  exec('license-checker --production --json', function(lcErr, lcStdout, lcStderr) {
    printPackages(JSON.parse(lsStdout), JSON.parse(lcStdout));
  });
});

function printPackages(list, licenses) {
  const dependencyLicenses = Object.keys(licenses);
  const dependencyNames = Object.keys(list.dependencies);
  const dependencies = {};

  dependencyNames.forEach(name => {
    dependencies[name] = { name: name, version: 'not found', licenses: null, repository: null };

    if (list.dependencies[name]['version'] !== null) {
      dependencies[name]['version'] = list.dependencies[name].version;
    }

    // Find the license
    const dependencyLicense = dependencyLicenses.find(license => license.indexOf(name) >= 0);

    if (dependencyLicense) {
      dependencies[name]['licenses'] = licenses[dependencyLicense].licenses;
      dependencies[name]['repository'] = licenses[dependencyLicense].repository;
    }

    // Output formatting
    const license = dependencies[name]['licenses'];
    const licenseFormatted = greenLicenses.indexOf(license) >= 0 ? chalk.green(license) : chalk.red(license);
    console.log(`${name} - ${dependencies[name].version} - ${licenseFormatted} - ${dependencies[name].repository}`);
  });
}
