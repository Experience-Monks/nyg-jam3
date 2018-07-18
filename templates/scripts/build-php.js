/**
 * Create the index.php file based on the outputted index.html
 *
 * This file will remove the html meta tags and replace it with
 * a php script that automatically outputs the meta tags based on
 * the current url. Values are populated from the share.json file.
 *
 * Replacing the meta tags relies on the <title /> tag being the
 * first tag, and the <meta name="twitter:card" /> tag being the
 * last tag. It will remove all the meta tags between (and including)
 * those 2 tags and replace them with the PHP script.
 */
const fs = require('fs');
const path = require('path');

const WRITE = `<?php require('./lib/Meta.php'); $meta = new Meta('json/share.json', isset($_GET['u'])?$_GET['u']:''); $meta->write();?>`;

const SRC = path.resolve(__dirname, '../build/index.html');
const DEST = path.resolve(__dirname, '../build/index.php');

/**
 * Generates the index.php from the index.html file
 */
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
