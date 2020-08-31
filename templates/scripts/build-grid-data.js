const fs = require('fs');
const path = require('path');
const jsonSass = require('json-sass-vars');

const SASS_VAR_PREFIX = 'grid';
const SRC_FILENAME = 'grid.json';
const DEST_FILENAME = 'grid.scss';
const SRC_URL = path.resolve(__dirname, `../src/data/${SRC_FILENAME}`);
const DEST_URL = path.resolve(__dirname, `../src/style/${DEST_FILENAME}`);

function buildDebugGridData() {
  const writeStream = fs.createWriteStream(DEST_URL);
  writeStream.on('close', () => {
    fs.appendFileSync(DEST_URL, '\r\n', err => {
      if (err) throw err;
    });
  });

  return fs
    .createReadStream(SRC_URL)
    .pipe(
      jsonSass({
        prefix: `$${SASS_VAR_PREFIX}: `
      }).on('error', function() {
        console.error(`Error reading ${SRC_FILENAME}`);
      })
    )
    .pipe(writeStream);
}

if (module.parent) {
  module.exports = buildDebugGridData;
} else {
  buildDebugGridData();
}
