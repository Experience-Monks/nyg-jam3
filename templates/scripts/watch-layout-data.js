const fs = require('fs');
const path = require('path');
const buildLayout = require('./build-layout-data');

function watchLayoutData() {
  return fs.watch(path.resolve(__dirname, '../src/data/layout.json'), { encoding: 'buffer' }, type => {
    if (type === 'change') {
      try {
        buildLayout();
      } catch (e) {
        console.error(e);
      }
    }
  });
}

if (module.parent) {
  module.exports = watchLayoutData;
} else {
  watchLayoutData();
}
