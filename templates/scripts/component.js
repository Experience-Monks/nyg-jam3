const argv = require('minimist')(process.argv.slice(2), {
  boolean: ['stateless']
});
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const maxstache = require('maxstache');
const chalk = require('chalk');

const type = argv.stateless ? 'stateless-component' : 'component';

function formatComponentName(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

let name = argv._[0];
if (!name) {
  console.error(chalk.red(`Error: Must give a ${type} name to create.`));
  process.exit(0);
}

name = formatComponentName(name);

let targetfolder = argv._[1];
targetfolder = targetfolder ? `${formatComponentName(targetfolder)}/` : '';

const cwd = process.cwd();
const dir = path.resolve(__dirname, [`../src/components/`, targetfolder, name].join(''));
fs.stat(dir, (err, stat) => {
  if (err) {
    write();
  } else {
    console.log(chalk.red(`Path at ${path.relative(cwd, dir)} already exists!`));
  }
});

function write() {
  mkdirp(dir, err => {
    if (err) throw err;

    const files = [
      template(path.resolve(__dirname, 'templates/' + type + '/Component.js'), path.resolve(dir, `${name}.js`)),
      template(path.resolve(__dirname, 'templates/' + type + '/Component.scss'), path.resolve(dir, `${name}.scss`)),
      template(
        path.resolve(__dirname, 'templates/' + type + '/Component-story.js'),
        path.resolve(dir, `${name}-story.js`)
      )
    ];

    Promise.all(files)
      .then(() => {
        console.log(`Created new ${name} ${type} at ${dir}`);
      })
      .catch(err => console.error(err));
  });
}

function template(input, output) {
  const data = {
    name: name,
    depth: targetfolder ? '../' : ''
  };
  return new Promise((resolve, reject) => {
    fs.readFile(input, 'utf8', (err, str) => {
      if (err) return reject(err);
      str = maxstache(str, data);
      fs.writeFile(output, str, err => {
        if (err) return reject(err);
        resolve();
      });
    });
  });
}
