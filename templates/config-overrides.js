const fs = require('fs');
const DEBUG = true;

module.exports = function override(config, env) {
  DEBUG && fs.writeFile('default-cra-rewrite-config.json', JSON.stringify(config));

  DEBUG && fs.writeFile('final-cra-rewrite-config.json', JSON.stringify(config));
  return config;
};
