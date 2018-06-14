const fs = require('fs');
const path = require('path');
const jsonSass = require('json-sass-vars');

const FILENAME = 'layout';
const PREFIX = 'layout';

fs
  .createReadStream(path.resolve(__dirname, `../src/data/${FILENAME}.json`))
  .pipe(
    jsonSass({
      prefix: `$${PREFIX}: `
    })
  )
  .pipe(fs.createWriteStream(path.resolve(__dirname, `../src/style/${FILENAME}.scss`)));
