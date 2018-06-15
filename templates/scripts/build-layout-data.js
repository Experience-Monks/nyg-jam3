const fs = require('fs');
const path = require('path');
const jsonSass = require('json-sass-vars');

const SASS_VAR_PREFIX = 'layout';
const SRC_FILENAME = 'layout';
const SRC_URL = path.resolve(__dirname, `../src/data/${SRC_FILENAME}.json`);
const DEST_URL = path.resolve(__dirname, `../src/style/${SRC_FILENAME}.scss`);

function buildLayoutData() {
  const writeStream = fs.createWriteStream(DEST_URL);

  writeStream.on('close', () => {
    // Appending extra newline due to prettier style convention
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
        console.error('Error reading layout.json');
      })
    )
    .pipe(writeStream);
}

if (module.parent) {
  module.exports = buildLayoutData;
} else {
  buildLayoutData();
}
