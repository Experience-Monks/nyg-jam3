const fs = require('fs');
const path = require('path');

const WRITE = `<?php require('./lib/Meta.php'); $meta = new Meta('json/share.json', isset($_GET['u'])?$_GET['u']:''); $meta->write();?>`;

const SRC = path.resolve(__dirname, '../build/index.html');
const DEST = path.resolve(__dirname, '../build/index.php');

function buildPHP() {
  fs.readFile(SRC, 'utf8', (err, response) => {
    if (!err) {
      const output = response.replace(/<title>.*twitter:card.*?>/g, WRITE);
      fs.writeFile(DEST, output, (err, response) => {
        if (err) {
          console.log('Could not write to destination:', DEST);
        }
      });
    } else {
      console.log('Could not read source:', SRC);
    }
  });
}

if (module.parent) {
  module.exports = buildPHP;
} else {
  buildPHP();
}
