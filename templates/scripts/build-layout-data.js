const fs = require('fs');
const path = require('path');
const jsonSass = require('json-sass-vars');

const FILENAME = 'layout';
const PREFIX = 'layout';

function buildLayoutData() {
  return fs
    .createReadStream(path.resolve(__dirname, `../src/data/${FILENAME}.json`))
    .pipe(
      jsonSass({
        prefix: `$${PREFIX}: `
      }).on('error', function() {
        console.error('Error reading layout.json');
      })
    )
    .pipe(fs.createWriteStream(path.resolve(__dirname, `../src/style/${FILENAME}.scss`)));
}

if (module.parent) {
  module.exports = buildLayoutData;
} else {
  buildLayoutData();
}
