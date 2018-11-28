const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const mkdirp = require('mkdirp');
const maxstache = require('maxstache');
const chalk = require('chalk');

const argv = require('minimist')(process.argv.slice(2), {
  boolean: ['stateless', 'connected', 'page']
});

let type;
if (argv.page) {
  type = 'page';
} else if (argv.stateless) {
  type = 'stateless-component';
} else if (argv.connected) {
  type = 'connected-component';
} else {
  type = 'component';
}

function formatComponentName(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

let name = argv._[0];
if (!name) {
  console.error(chalk.red(`Error: Must give a ${type} name to create.`));
  process.exit(0);
}

name = formatComponentName(name);

let targetFolder = argv._[1];
targetFolder = targetFolder ? `${formatComponentName(targetFolder)}/` : '';

const cwd = process.cwd();
const dir =
  type === 'page'
    ? path.resolve(__dirname, `../src/${type}s/` + name)
    : path.resolve(__dirname, [`../src/components/`, targetFolder, name].join(''));

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

    const files =
      type === 'page'
        ? [
            template(path.resolve(__dirname, 'templates/Page/Page.js'), path.resolve(dir, `${name}.js`)),
            template(path.resolve(__dirname, 'templates/Page/Page.scss'), path.resolve(dir, `${name}.scss`))
          ]
        : [
            template(path.resolve(__dirname, 'templates/' + type + '/Component.js'), path.resolve(dir, `${name}.js`)),
            template(path.resolve(__dirname, 'templates/' + type + '/Component-story.js'), path.resolve(dir, `${name}-story.js`)),
            template(
              path.resolve(__dirname, 'templates/' + type + '/Component.scss'),
              path.resolve(dir, `${name}.scss`)
            )
          ];

    Promise.all(files)
      .then(() => {
        execSync('npm run build-css');
        console.log(`Created new ${name} ${type} at ${dir}`);
      })
      .catch(err => console.error(err));
  });
}

function template(input, output) {
  const data = {
    name: name,
    depth: targetFolder ? '../' : ''
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
