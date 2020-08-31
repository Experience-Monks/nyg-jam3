const fs = require('fs');
const path = require('path');

const buildGrid = require('./build-grid-data');

function watchGridData() {
  return fs.watch(path.resolve(__dirname, '../src/data/grid.json'), { encoding: 'buffer' }, type => {
    if (type === 'change') {
      try {
        buildGrid();
      } catch (e) {
        console.error(e);
      }
    }
  });
}

if (module.parent) {
  module.exports = watchGridData;
} else {
  watchGridData();
}
